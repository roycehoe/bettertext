import express from "express";
import { createMessage, getMessage, SetTextDataRequest } from "./database";

const router = express.Router()

router.get('/', async (req: any, res) => {
    const data = await getMessage()
    res.json(data)
})

router.post('/', async (req: any, res) => {
    const postData = {
        username: req.body.username,
        message: req.body.message,
        createdAt: Date.now()
    } as SetTextDataRequest

    await createMessage(postData)
    res.json(postData)
})

module.exports = router