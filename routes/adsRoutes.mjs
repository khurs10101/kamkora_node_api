import express from 'express'
import multer from 'multer'
const router = express.Router()

import { addAds } from '../controllers/adsController.mjs'
import { deleteAds } from '../controllers/adsController.mjs'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/ads')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(new Error("Filetype dont match"), false)
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})

// router.get('/', adsList)
// router.get('/service/:id', serviceBasedAdsList)
router.post('/add', upload.single('adsImage'), addAds)
router.post('/delete/:id', deleteAds)
// router.get('/:id', adsSingle)
// router.edit('/edit/:id', adEdit)


export default router

