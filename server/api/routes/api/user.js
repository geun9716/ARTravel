import express from 'express'
import user from '../../controller/user'

const router = express.Router()

// 로그인
router.post('/login', user.login)


// 회원가입
router.post('/signUp', user.signUp)


// 프로필
router.get('/profile/:userId', user.profile)

export default router
