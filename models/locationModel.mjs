import mongoose from 'mongoose'

const locationSchema = mongoose.Schema({

    latitude: {
        type: String
    },

    longitude: {
        type: String
    },

    city: {
        type: String
    },

    state: {
        type: String
    }
    
})

export default mongoose.model('Location', locationSchema)