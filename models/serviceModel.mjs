import mongoose from 'mongoose'
const Schema = mongoose.Schema

const serviceSchema = Schema({

    name: {
        type: String
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
    }

})

export default mongoose.model('Service', serviceSchema)