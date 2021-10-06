const express = require('express');
const app = express()
require('dotenv').config()

const router = require('./routes/index')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/', router)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening in port ${port}`))
