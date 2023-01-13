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

    mailchimp.setConfig({
    apiKey: process.env.API_KEY,
    server: "us14"
    });

    const event = {
    name: "JS Developers Meetup"
    };

    const footerContactInfo = {
    company: "Mailchimp",
    address1: "675 Ponce de Leon Ave NE",
    address2: "Suite 5000",
    city: "Atlanta",
    state: "GA",
    zip: "30308",
    country: "US"
    };

    const campaignDefaults = {
    from_name: "Gettin' Together",
    from_email: "gettintogether@example.com",
    subject: "JS Developers Meetup",
    language: "EN_US"
    };

    async function run() {
        try {
            const response = await mailchimp.lists.createList({
                name: event.name,
                contact: footerContactInfo,
                permission_reminder: "permission_reminder",
                email_type_option: true,
                campaign_defaults: campaignDefaults
            });
        
            console.log(
                `Successfully created an audience. The audience id is ${response.id}.`
            );
        } catch (error) {
            console.error(error);
        } finally {
            switch (response.statusCode) {
                case 200:
                    res.sendFile(__dirname + "/success.html");
                    break;
                case 400 || 401 || 402 || 403 || 404:
                    res.sendFile(__dirname + "/failure.html");
                    break;
        
                default:
                    break;
            }
        }
    
}

run();

});

app.listen(3000, () => {
    console.log("Server is listening on PORT: 3000");
});

// API KEY
// 8a8c6cb060980945bf7bbac525caec55

