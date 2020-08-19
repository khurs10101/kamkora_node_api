import express from 'express'
import { addOrder, updateOrder, getAllOrders, getAllOrdersOfSingleUser, addToCart, getCartOfUsers } from '../controllers/orderController.mjs'
import auth from '../middlewares/jwtAuthMiddleware.mjs'

const router = express.Router()

router.get('/:id', auth, getAllOrdersOfSingleUser)
// router.get('/recent/:id', auth, getCurrentOrderOfSingleUser)
router.get('/', auth, getAllOrders)
router.get('/cart/:id', auth, getCartOfUsers)
router.post('/add/:id', addOrder)
router.post('/update/:id', updateOrder)
router.post('/cart/:id', addToCart)



export default router;