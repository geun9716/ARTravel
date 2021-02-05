import db from '../middleware/db'
import httpStatus from 'http-status-codes'

// 댓글 달기
async function comment(req, res) {
    try {
        
        const userId = req.params.userId
        const postId = req.params.postId
        const comment = req.body.comment

        await db.query('insert into comments set ?', {
            userID : userId,
            postID : postId,
            comment : comment,
            class : 0,
            seq : 0
        })

        let groupNum = await db.query('select commentID from comments order by commentID desc limit 1', [])

        groupNum = groupNum[0].commentID

        await db.query('update comments set groupNum = ? where commentID = ?', [groupNum, groupNum])

        res.status(httpStatus.OK).send({
            success : true,
            message : "comment successfully"
        })

    } catch (error) {
        console.error(error, "comment api error")
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
    }
}

// 대댓글 달기
async function comments(req, res) {
    try {

        const userId = req.params.userId
        const postId = req.params.postId
        const commentId = req.params.commentId
        const comment = req.body.comment

        let seq = await db.query('select seq from comments where groupNum = ? order by seq desc limit 1', [commentId])

        await db.query('insert into comments set ?', {
            userID : userId,
            postID : postId,
            comment : comment,
            class : 1,
            seq : seq[0].seq + 1,
            groupNum : commentId
        })

        res.status(httpStatus.OK).send({
            success : true,
            message : "comments successfully"
        })

    } catch (error) {
        console.error(error, "comments api error")
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
    }
}

async function updateComment(req, res) {
    try {
        const commentId = req.params.commentId
        const updateComment = req.body.comment

        await db.query('update comments set comment = ? where commentID = ?', [updateComment, commentId])

        res.status(httpStatus.OK).send({
            success : true,
            message : "update comment successfully"
        })
        
    } catch (error) {
        console.error(error, "update comment api error")
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
    }
}

async function deleteComment(req, res) {
    try {
        const commentId = req.params.commentId

        let isComment = ('select class from comments where commentID = ?', [commentId])

        if(isComment[0].class == 0) {
            await db.query('delete from comments where groupNum = ?', [commentId])
        } else {
            await db.query('delete from comments where commentID = ?', [commentId])
        }
        
        res.status(httpStatus.OK).send({
            success : true,
            message : "update comment successfully"
        })
        
    } catch (error) {
        console.error(error, "update comment api error")
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
    }
}

async function showComment(req, res) {
    try {

        const userId = req.query.userId
        const postId = req.query.postId

        let postInfo = await db.query('select commentID, userID, (select nickname from users where userID = userID) AS nickname, class, seq, groupNum, comment, if(userID = ?, true, false) AS myComment from comments where postID = ? order by groupNum desc', [userId, postId])

        res.status(httpStatus.OK).send(postInfo)

        
    } catch (error) {
        console.error(error, "show comment api error")
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
    }
}


export default {
    comment,
    comments,
    updateComment,
    deleteComment,
    showComment
}