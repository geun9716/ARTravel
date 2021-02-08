import db from '../middleware/db'
import httpStatus from 'http-status-codes'
import security from '../middleware/security'

// 로그인
async function login(req, res) {
    try {

        const userEmail = req.body.userEmail
        const userPw = req.body.userPw

        const selectKey = await db.query("select userKey from users where email = ?", [userEmail])

        const secret = await security.pbkdf2(userPw, selectKey[0].userKey)

        const pw = secret.pw

        let userInfo = await db.query('select userID, email, nickname, introduce, followerCount, followingCount from users where email = ? AND password = ?', [userEmail, pw])

        if(userInfo.length > 0){
            userInfo = userInfo[0]
            const returnObj = {
                userId : userInfo.userID,
                userEmail : userInfo.email,
                nickname : userInfo.nickname,
                introduce : userInfo.introduce,
                followerCount : userInfo.followerCount,
                followingCount : userInfo.followingCount
            }
            res.status(httpStatus.OK).send(returnObj)
        } else{
            res.status(httpStatus.NOT_FOUND).send({
                success : false,
                message : "Failed to login"
            })
        }
   } catch(error) {
        console.error(error, "login api error")
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
   }
}

// 회원가입
async function signUp(req, res) {
    try {
        
        const userEmail = req.body.userEmail
        const userPw = req.body.userPw
        const nickname = req.body.nickname
        const introduce = req.body.introduce
        const secret = await security.security(userPw)

        let signUp = await db.query('insert into users set ?', {
            email : userEmail,
            password : secret.pw,
            userKey : secret.pwKey,
            nickname : nickname,
            introduce : introduce
        })

        if(signUp.errno > 0) {
            res.status(httpStatus.NOT_FOUND).send({
                success : false,
                message : "Failed to sign up"
            })
        }
        else {
            res.status(httpStatus.OK).send({
                success : true,
                message : "Register user information successfully"
            })
        }

    } catch (error) {
        console.error(error, "signUp api error")
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
    }
}

// 프로필
async function profile(req, res) {
    try {

        const userId = req.params.userId

        let userInfo = await db.query('select userID, email, nickname, introduce, followerCount, followingCount from users where userID = ?', [userId])

        let userPost = await db.query('select postID, content, imgPath from posts where userID = ? order by timestamp desc', [userId])

        const returnObj = {
            userInfo : userInfo,
            userPost : userPost
        }

        res.status(httpStatus.OK).send(returnObj)


        
    } catch (error) {
        console.error(error, "profile api error")
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
    }
}

export default {
    login,
    signUp,
    profile
}