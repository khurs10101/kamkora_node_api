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

    avatar: {
        type: String
    }

})

export default mongoose.model('SubService', subServiceModel)
