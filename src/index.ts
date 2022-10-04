import express from 'express'
import cors from 'cors'
import v1 from './routes/v1'

import { serverConfig } from './configs'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/v1', v1)

app.listen(serverConfig.port, () => {
    console.log('Server running on http://localhost:8080/');
})