import mongoose from 'mongoose'

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
    }
})

export default mongoose.model('Order', orderSchema)