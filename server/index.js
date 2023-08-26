import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
import cors from 'cors'
import { socket } from './socket/index.js'
dotenv.config()

const PORT = process.env.PORT || 3002

const app = express()

app.use(
    cors({
        origin: '*',
    })
)

const httpServer = http.createServer(app)

socket(
    new Server(httpServer, {
        cors: {
            origin: `http://localhost:${process.env.CLIENT_URL}`,
        },
    })
)

app.post('/api', (req, res) => {
    res.json('Hello')
})

httpServer.listen(PORT, () => {
    console.log('Server ready on port ' + PORT)
})
