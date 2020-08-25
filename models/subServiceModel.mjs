import mongoose from 'mongoose'
const Schema = mongoose.Schema

const subServiceModel = Schema({

    name: {
        type: String
    },

    serviceId: {
        type: String
    },

    rate: {
        type: String
    },

    url: {
        type: String
    },

    updatedAt:{
        type: Date,
        default: Date.now
    }

})

export default mongoose.model('SubService', subServiceModel)
