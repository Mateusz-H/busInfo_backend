import express from "express";
const router = express.Router()

router.use((req, res, next)=>{
    //todo set logger
    console.log(`New request to ${req.url} from ${req.ip} timestamp: ${Date.now()}`);
    next()
})

router.get('/', function (req, res) {
    res.send('Hello World')
})

export default router;