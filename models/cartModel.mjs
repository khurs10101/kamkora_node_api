import mongoose from 'mongoose'
import Order from './orderModel.mjs'
import { generate } from '../utils/customValidator.mjs'

const cartSchema = mongoose.Schema({
    userId: {
        type: String
    },
    docketId: {
        type: String,
        default: generate(6)
    },
    orders: {
        type: [Order.Schema]
    }
})

export default mongoose.model('Cart', cartSchema)