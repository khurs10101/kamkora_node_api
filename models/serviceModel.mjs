import mongoose from 'mongoose'
const Schema = mongoose.Schema

const serviceSchema = Schema({

    name: {
        type: String,
        text: true
    },

    url: {
        type: String
    },

    serviceId: {
        type: String
    },

    updatedAt: {
        type: Date,
        default: Date.now
    },
    tags: {
        type: String,
        text: true
    }

})

export default mongoose.model('Service', serviceSchema)