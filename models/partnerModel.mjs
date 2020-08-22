import mongoose from 'mongoose'

const Schema = mongoose.Schema

const partnerSchema = Schema({
    name: {
        type: String,
    },
    age: {
        type: Number
    },
    phone: {
        type: Number
    },
    email: {
        type: String
    },
    orders: {
        type: Array
    },
    profession: {
        type: String
    },
    avater: {
        type: String
    },
    password_digest: {
        type: String
    },
    isAccountVerified: {
        type: Boolean
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    states: {
        type: String
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Partner', partnerSchema)