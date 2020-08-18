import mongoose from 'mongoose'

const Schema = mongoose.Schema

const addressSchema = new Schema({
    name: {
        type: String
    },
    houseNo: {
        type: String
    },
    society: {
        type: String
    },
    userId: {
        type: String
    },
    addressLine1: {
        type: String
    },
    addressLine2: {
        type: String
    },
    latitude: {
        type: String
    },

    longitude: {
        type: String
    },

    city: {
        type: String
    },

    state: {
        type: String
    },

    pincode: {
        type: String
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Address', addressSchema)