import mongoose from 'mongoose'

const Schema = mongoose.Schema

const orderSchema = new Schema({
    userId: {
        type: String
    },
    docketId: {
        type: String
    },
    serviceId: {
        type: String
    },
    subcategory: {
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
    }
})

export default mongoose.model('Order', orderSchema)