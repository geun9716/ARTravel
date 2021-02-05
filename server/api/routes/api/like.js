import express from 'express'
const router = express.Router();
import like from '../../controller/like'

// 좋아요 누르기
router.get('/isLike/:userId/:postId', like.isLike)

export default router;