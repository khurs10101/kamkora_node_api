import mongoose from 'mongoose'
import Address from '../models/addressModel.mjs'

const Schema = mongoose.Schema

const orderSchema = new Schema({
    userId: {
        type: String
    },
    partnerId: {
        type: String
    },
    docketId: {
        type: String
    },
    serviceId: {
        type: String
    },
    subServiceId: {
        type: String
    },
    subSubServiceId: {
        type: String
    },
    subcategory: {
        type: String
    },
    subServiceName: {
        type: String
    },
    rate: {
        type: String
    },
    status: {
        type: String
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    address: {
        type: Address.Schema
    }
})

export default mongoose.model('Order', orderSchema)