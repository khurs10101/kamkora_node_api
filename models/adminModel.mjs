import mongoose from 'mongoose'

const Schema = mongoose.Schema

const adminSchema = Schema({

    email: {
        type: String
    },

    password: {
        type: String
    },

    role: {
        type: String
    }

})

export default mongoose.model('Admin', adminSchema)