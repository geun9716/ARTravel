import express from 'express'

import userRoute from './user'
import postRoute from './post'
import likeRoute from './like'
import commentRoute from './comment'
import notificationRoute from './notification'
import tourRoute from './tour'

const router = express.Router()

router.use("/user", userRoute)
router.use("/post", postRoute)
router.use("/like", likeRoute)
router.use("/comment", commentRoute)
router.use("/notification", notificationRoute)
router.use("/tour", tourRoute)


export default router