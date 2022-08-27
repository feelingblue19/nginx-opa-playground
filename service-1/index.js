const express = require('express')

const app = express()

const port = 3000

app.listen(port, function () {
    console.log(`Service listening on port ${port}!`)
})

app.get('/', function (req, res) {
    res.json({
        'status': 'Service 1 is up and running'
    })
})