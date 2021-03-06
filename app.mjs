import http from 'http'
import express from 'express'
import socketio from 'socket.io'
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
import appPagesRoutes from './routes/appPagesRoutes.mjs'
import adsRoutes from './routes/adsRoutes.mjs'

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors({ origin: '*' }))
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
app.use('/api/apps', appPagesRoutes)
app.use('/api/ads', adsRoutes)



const server = http.createServer(app)
export const io = socketio(server)


server.listen(PORT, () => {
    console.log(`server running at port ${PORT}`)
})