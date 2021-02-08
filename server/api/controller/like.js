import db from '../middleware/db'
import httpStatus from 'http-status-codes'
import post from './post'

async function isLike(req, res) {
    try {
        
        const userId = req.params.userId
        const postId = req.params.postId

        let liked = await db.query('insert into likes set ?', {
            userId : userId,
            postId : postId
        })

        if(!liked.errno) {
            await db.query('update posts set likeCount = likeCount + 1 where postID = ?',[postId])
            req.params.id = postId
            post.getPost(req, res)
        } else {
            await db.query('delete from likes where userID = ? AND postID = ?',[userId, postId])
            await db.query('update posts set likeCount = likeCount - 1 where postID = ?',[postId])
            req.params.id = postId
            post.getPost(req, res)
        }

        

        

    } catch (error) {
        console.error(error, "signUp api error")
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
    }
}

export default {
    isLike
}