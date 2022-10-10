const express = require('express');
const routes = require('./routes/routes');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const api_port = parseInt(process.env.API_PORT || '5000')


app.use(
    cors({
        methods: ['GET', 'POST'],
        origin: process.env.API_CORS_ORIGINS || "*"
    })
    )

app.use(express.json({ limit: '25mb' }));

app.use('/', routes)
app.use(bodyParser.json());


app.listen(api_port, () => {
    console.log(`Server Started at ${api_port}`)
})