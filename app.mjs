import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import { mongoURI } from './configs/urls.mjs'
import userRoutes from './routes/userRoutes.mjs'
import adminRoutes from './routes/adminRoutes.mjs'
import partnerRoutes from './routes/partnerRoutes.mjs'
import serviceRoutes from './routes/servicesRoutes.mjs'
import orderRoutes from './routes/ordersRoutes.mjs'
import addressRoutes from './routes/addressRoutes.mjs'

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/upload', express.static('upload'))

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log("mongodb success")
    })
    .catch(err => {
        console.log("mongodb failed: " + err)
    })

app.use('/api/admins', adminRoutes)
app.use('/api/users', userRoutes)
app.use('/api/partners', partnerRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/address', addressRoutes)





app.listen(5000, () => {
    console.log("server running at port 5000")
})