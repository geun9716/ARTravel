import express from 'express'
const router = express.Router();
import comment from '../../controller/comment'

// 댓글 달기
router.post('/comment/:userId/:postId', comment.comment)

// 대댓글 달기
router.post('/comment/:userId/:postId/:commentId', comment.comments)

// 댓글 수정
router.post('/updateComment/:commentId', comment.updateComment)

// 댓글 삭제
router.get('/deleteComment/:commentId', comment.deleteComment)

// 댓글 보기
router.get('/showComment', comment.showComment)

export default router;