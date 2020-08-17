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
        type: Boolean
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
    }
})

export default mongoose.model('User', userSchema)