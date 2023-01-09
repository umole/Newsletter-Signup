const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const mailchimp = require("@mailchimp/mailchimp_marketing");
const { response } = require('express');
require('dotenv').config();


const app = express();

app.use(express.static("Public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post('/', (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const useremail = req.body.email;

    // using Twilio SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs
    //javascript
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
    to: 'umolecodes@gmail.com', // Change to your recipient
    from: 'ozimedeumole@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    } 
    sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })

});

app.listen(3000, () => {
    console.log("Server is listening on PORT: 3000");
});

// API KEY
// 8a8c6cb060980945bf7bbac525caec55

