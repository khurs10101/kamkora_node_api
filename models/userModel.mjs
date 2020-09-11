import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = Schema({
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
    isVerified: {
        type: String
    }
    ,
    avater: {
        type: String
    },
    password_digest: {
        type: String
    },

    orders: {
        type: Array
    }
    ,
    blood: {
        type: String
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
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('User', userSchema)