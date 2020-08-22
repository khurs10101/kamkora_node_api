import mongoose from 'mongoose'
const Schema = mongoose.Schema

const avatarModel = new Schema({
    userId: {
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

export default mongoose.model('Avatar', avatarModel)