import { Router } from 'express';
const router = Router()

let message = "Hello I`m message from LMS test route"

router.get('/', (req, res) => {
    res.send(message)
})

router.post('/', (req, res) => {
    message = req.body.message
    res.send("Message successfuly updated")
})

export default router