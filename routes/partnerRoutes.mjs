import express from 'express'
import multer from 'multer'
import {
    partnerList, partnerSignIn, partnerSignUp, partnerUpdate,
    uploadPartnerDocumentIdProof, uploadPartnerDocumentAddressProof,
    uploadPartnerAvatar
}
    from '../controllers/partnerController.mjs'
const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file)
        if (file.fieldname === 'avatar')
            cb(null, 'upload/partners/avatar')
        if (file.fieldname === 'personalId')
            cb(null, 'upload/partners/personal_id')
        if (file.fieldname === 'addressId')
            cb(null, 'upload/partners/address_id')

    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + '-' + file.fieldname + '-' + file.originalname)
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


router.get('/', partnerList)
router.post('/signup', partnerSignUp)
router.post('/signin', partnerSignIn)
router.put('/edit/:id', partnerUpdate)
router.post('/upload/avatar/:id', upload.single('partnerAvatar'), uploadPartnerAvatar)
router.post('/upload/id/:id', upload.single('personalId'), uploadPartnerDocumentIdProof)
router.post('/upload/address/:id', upload.single('addressId'), uploadPartnerDocumentAddressProof)

export default router