import express from 'express'

import { addAddressOfUser, getAddressOfUser } from '../controllers/addressController.mjs'

const router = express.Router()

router.post('/add/:id', addAddressOfUser)
router.get('/:id', getAddressOfUser)

export default router