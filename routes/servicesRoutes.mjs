import express from 'express'
import multer from 'multer'
import auth from '../middlewares/jwtAuthMiddleware.mjs'
import { listAllServices, addAService, updateService, updateSubService } from '../controllers/serviceController.mjs'

const router = express.Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file)
        if (file.fieldname === 'service_image')
            cb(null, 'upload/services')
        if (file.fieldname === 'sub_service_image')
            cb(null, 'upload/sub_service')

    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + '-' + file.fieldname + '-' + file.originalname)
    }
})

const upload = multer({
    storage: storage
})

router.get('/', listAllServices)
router.post('/add', upload.single('service_image'), addAService)
router.post('/edit/:id', upload.single('service_image'), updateService)
router.post('/addsubservice/:id', upload.single('sub_service_image'), updateSubService)

export default router