import express from 'express'
const appPort = 3000;

const app = express();

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.listen(appPort, function() {
    console.log('Started app on port -',appPort);
});