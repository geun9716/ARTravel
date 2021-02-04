import db from '../middleware/db'
import httpStatus from 'http-status-codes'
import security from '../middleware/security'
import { post } from '../routes/api/post'

async function isLike(req, res) {
    try {
        
        const userId = req.params.userId
        const postId = req.params.postId

        await db.query('insert into likes set ?', {
            userId : userId,
            postId : postId
        })

        await db.query('update posts set likeCount = likeCount + 1 where postID = ?',[postId])

        res.status(httpStatus.OK).send({
            success : true,
            message : "Register user information successfully"
        })

    } catch (error) {
        console.error(error, "signUp api error")
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
    }
}

async function disLike(req, res) {
    try {
        
        const userId = req.params.userId
        const postId = req.params.postId

        await db.query('delete from likes where userID = ? AND postID = ?',[userId, postId])

        await db.query('update posts set likeCount = likeCount - 1 where postID = ?',[postId])

        res.status(httpStatus.OK).send({
            success : true,
            message : "Register user information successfully"
        })

    } catch (error) {
        console.error(error, "signUp api error")
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
    }
}

export default {
    isLike,
    disLike
}