import express from 'express'
const router = express.Router();
import like from '../../controller/like'

// 좋아요 누르기
router.get('/isLike/:userId/:postId', like.isLike)

// 좋아요 취소
router.get('disLike/:userId/:postId', like.disLike)

export default router;