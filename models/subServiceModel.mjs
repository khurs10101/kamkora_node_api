import mongoose from 'mongoose'
const Schema = mongoose.Schema

const subServiceModel = Schema({

    name: {
        type: String,
        text: true
    },

    serviceId: {
        type: String
    },

    subServiceId: {
        type: String
    },

    rate: {
        type: String
    },

    url: {
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

export default mongoose.model('Subservice', subServiceModel)
