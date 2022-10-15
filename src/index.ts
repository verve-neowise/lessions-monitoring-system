import { requestLogger } from '@middlewares/index';
import express from 'express'
import cors from 'cors'

import api from '@routes/api'
import main from '@routes/main'
import { serverConfig } from '@configs/index'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(express.static('static'))

app.use(requestLogger)

app.use('/', main)
app.use('/api/v1', api)

app.listen(serverConfig.port, () => {
    console.log(`Server running on http://localhost:${serverConfig.port}`)
})
