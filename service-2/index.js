const express = require('express')

const app = express()

const port = 3000

app.listen(port, function () {
    console.log(`Service listening on port ${port}!`)
})

app.get('/', function (req, res) {
    res.json({
        'status': 'Service 2 is up and running'
    })
})

app.post('/', function (req, res) {
    res.json({
        'status': 'Post method service 2 is up and running'
    })
})