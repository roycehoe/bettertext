import express from "express";
import { createMessage, getMessage, SetTextDataRequest } from "./database";

const router = express.Router()

router.get('/:chatroom', async (req: any, res) => {
    const data = await getMessage(req.params)
    res.json(data)
})

router.post('/', async (req: any, res) => {
    const postData = {
        username: req.body.username,
        message: req.body.message,
        createdAt: Date.now(),
        chatroom: req.body.chatroom
    } as SetTextDataRequest

    await createMessage(postData)
    res.json(postData)
})

module.exports = router