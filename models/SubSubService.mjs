import mongoose from 'mongoose'

const Schema = mongoose.Schema

const SubSubSchema = new Schema({
    serviceId: {
        type: String
    },

    subServiceId: {
        type: String
    },

    subSubServiceId: {
        type: String
    },

    url: {
        type: String
    },

    title: {
        type: String
    },

    description: {
        type: String
    },

    rate: {
        type: String
    }
})

export default mongoose.model('SubSubService', SubSubSchema)
