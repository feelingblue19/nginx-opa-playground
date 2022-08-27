const express = require('express')
const axios = require('axios')
const app = express()
require('dotenv').config()

const port = 3000


const handleAuth = (req, res) => {
    const url = process.env.OPA_URL;

    const body = {
        input: {
            authorization: req.headers['authorization'],
            method: req.headers['x-original-method'],
            path: req.headers['x-original-uri'],
        }
    };

    axios.post(url, body)
        .then((result) => {
            console.log(result.data);
            if (result.data.result.allow && result.status == 200) {
                return res.status(200).send('OK');
            } else {
                return res.status(401).send('Unauthorized');
            }
        }).catch((err) => {
            console.log(err);
            return res.status(401).send('Unauthorized');
        });
}

app.get('/', handleAuth)

app.listen(port, function () {
    console.log(`Auth service listening on port ${port}!`)
})