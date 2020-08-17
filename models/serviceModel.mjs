import mongoose from 'mongoose'
const Schema = mongoose.Schema

const serviceSchema = Schema({

    name: {
        type: String
    },

    avatar:{
        type: String
    }

})

export default mongoose.model('Service', serviceSchema)