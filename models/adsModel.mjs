import mongoose from 'mongoose'

const Schema = mongoose.Schema

const adsSchema = new Schema({
    name: {
        type: String
    },
    url: {
        type: String
    },
    serviceId: {
        type: String
    }
    ,
    ad_type: {
        type: String
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    ad_location: {
        type: String
    },
    subServiceId: {
        type: String
    },
    title: {
        type: String
    },

    description: {
        type: String
    }
})

export default mongoose.model('AdsModel', adsSchema)