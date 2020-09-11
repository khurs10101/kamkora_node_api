import mongoose from 'mongoose'
import Order from './orderModel.mjs'
import Address from './addressModel.mjs'
import { generate } from '../utils/customValidator.mjs'
const Schema = mongoose.Schema
const cartSchema = new Schema({
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
    },

    addressId: {
        type: String
    }
})

export default mongoose.model('Cart', cartSchema)