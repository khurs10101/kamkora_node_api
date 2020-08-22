import mongoose from 'mongoose'

const Schema = mongoose.Schema

const personalDoc = new Schema({
    userId: {
        type: String
    },
    doc_type: {
        type: String
    },
    doc_number: {
        type: String
    },
    url: {
        type: String
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('PersonalDoc', personalDoc)