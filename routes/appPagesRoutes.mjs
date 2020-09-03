import express from 'express'
import {
    getClientHomeDetails, getClientServiceDetails,
    getClientSubServiceDetails, getClientOrderPageDetails
} from '../controllers/appPagesController.mjs'

const router = express.Router()

router.get('/home', getClientHomeDetails)
router.get('/service/:id', getClientServiceDetails)
router.get('/subservice', getClientSubServiceDetails)
router.get('/orderpage', getClientOrderPageDetails)

export default router