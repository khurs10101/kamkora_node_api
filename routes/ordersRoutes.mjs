import express from 'express'
import {
    addOrder, updateOrder, getAllOrders,
    getAllOrdersOfSingleUser, addToCart, getCartOfUsers,
    getOrdersOfPartners, completedCurrentOrder,
    acceptCurrentOrder, rejectCurrentOrder
} from '../controllers/orderController.mjs'
import auth from '../middlewares/jwtAuthMiddleware.mjs'

const router = express.Router()

router.get('/:id', getAllOrdersOfSingleUser)
// router.get('/recent/:id', auth, getCurrentOrderOfSingleUser)
router.get('/', getAllOrders)
router.get('/cart/:id', getCartOfUsers)
router.post('/add/:id', addOrder)
router.post('/update/:id', updateOrder)
router.post('/cart/:id', addToCart)
router.post('/partners', getOrdersOfPartners)
router.post('/accept/:id', acceptCurrentOrder)
router.post('/reject/:id', rejectCurrentOrder)
router.post('/complete/:id', completedCurrentOrder)




export default router;