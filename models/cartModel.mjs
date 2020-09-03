import mongoose from 'mongoose'
import Order from './orderModel.mjs'
import Address from './addressModel.mjs'
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
    },

    address: {
        type: [Address.Schema]
    }
})

export default mongoose.model('Cart', cartSchema)