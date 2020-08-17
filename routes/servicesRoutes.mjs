import express from 'express'
import auth from '../middlewares/jwtAuthMiddleware.mjs'
import { listAllServices, addAService, updateService, updateSubService } from '../controllers/serviceController.mjs'

const router = express.Router()

router.get('/',auth, listAllServices)
router.post('/add', addAService)
router.post('/edit/:id', updateService)
router.post('/addsubservice/:id', updateSubService)

export default router