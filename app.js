const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static("Public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post('/', (req, res) => {
    console.log(req.body);
});

app.listen(3000, () => {
    console.log("Server is listening on PORT: 3000");
});