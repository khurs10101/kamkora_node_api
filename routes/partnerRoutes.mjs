import express from 'express'
import { partnerList, partnerSignIn, partnerSignUp, partnerUpdate } from '../controllers/partnerController.mjs'
const router = express.Router()


router.get('/', partnerList);
router.post('/signup', partnerSignUp);
router.post('/signin', partnerSignIn);
router.put('/edit/:id')

export default router