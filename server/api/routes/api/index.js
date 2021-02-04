import express from 'express'

import userRoute from './user'

const router = express.Router()


router.use("/user", userRoute)

export default router