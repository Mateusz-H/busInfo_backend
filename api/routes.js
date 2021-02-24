import express from "express";
import {stopsService} from "../app.js";
const router = express.Router()

router.use((req, res, next)=>{
    //todo set logger
    console.log(`New request to ${req.url} from ${req.ip} timestamp: ${Date.now()}`);
    next()
})

router.get('/', function (req, res) {
    res.send('Hello World')
})
router.get('/stops', function (req, res) {
    res.send(stopsService.stopsWithIds)
})

export default router;