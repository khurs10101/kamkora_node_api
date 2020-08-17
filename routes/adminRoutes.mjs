import express from 'express'
import { adminSignIn, adminSignUp } from '../controllers/adminController.mjs'

const router = express.Router()

router.post('/signin', adminSignIn)
router.post('/signup', adminSignUp)


export default router