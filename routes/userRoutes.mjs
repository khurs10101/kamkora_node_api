import express from 'express'
import multer from 'multer'
import { userSignin, userSignup, usersList, userUpdate, userUploadAvatar, userGetAvatar } from '../controllers/userController.mjs'
import auth from '../middlewares/jwtAuthMiddleware.mjs'
const router = express.Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/users/avatar')
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

// const upload= multer({dest: 'upload/'})

router.get('/', usersList)
router.post('/signin', userSignin)
router.post('/signup', userSignup)
router.post('/edit/:id', userUpdate)
router.post('/avatar/:id', upload.single('userAvatar'), userUploadAvatar)
router.get('/avatar/:id', userGetAvatar)
// router.post('/upload/:id', userUploadProfilePic)

export default router