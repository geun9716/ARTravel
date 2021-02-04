import db from '../middleware/db'
import httpStatus from 'http-status-codes'
import security from '../middleware/security'

// 로그인
async function login(req, res) {
    try {
        let userInfo = await db.query('select * from users', [])

        if(userInfo.length > 0){
            const returnObj = {
                userInfo : userInfo
            }
            res.status(httpStatus.OK).send(returnObj)
        } else{
            res.status(httpStatus.NOT_FOUND).send()
        }
   } catch(error) {
        console.error(error, "login api error")
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
   }
}

export default {
    login
}