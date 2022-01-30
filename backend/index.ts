import express from "express";
import { createSocketServer, setupSocketServer } from "./socket";


var router = require('./router')
var cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router)

const io = createSocketServer(app)
setupSocketServer(io)
