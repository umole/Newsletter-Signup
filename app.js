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
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const useremail = req.body.email;
    dc="us14";
    apikey="8a8c6cb060980945bf7bbac525caec55-us14"

    // curl -sS \
    // "https://${dc}.api.mailchimp.com/3.0/ping" \
    // --user "anystring:${apikey}" | jq -r

    // axios.get(`https://${dc}.api.mailchimp.com/3.0/ping`,{
    //     auth: {
    //         username: 'umole',
    //         password: apikey,
    //         //user: `umole:${apikey}`
    //     }
    // }).then((response) => {
    //     console.log(response.data);
    // }).catch((error) => {
    //     console.error(error);
    // });


    const event_name = "JavaScript Developers Meetup";

    const footer_contact_info = {
    company: "Mailchimp",
    address1: "675 Ponce de Leon Ave NE",
    address2: "Suite 5000",
    city: "Atlanta",
    state: "GA",
    zip: "30308",
    country: "US"
    }

    const campaign_defaults = {
    from_name: "Gettin'\'' Together",
    from_email: "gettintogether@example.com",
    subject: "Bash Developers Meetup",
    language: "EN_US"
    }

    axios.post(`https://${dc}.api.mailchimp.com/3.0/lists`, {
        name: event_name,
        contact: footer_contact_info,
        permission_reminder: "permission_reminder",
        email_type_option: true,
        campaign_defaults: campaign_defaults
    }, {
        auth: {
            username: 'umole',
            password: apikey,
          }
    }).then((response) => {
        console.log(response.body);
    }).catch((error) => {
        console.error(error);
    });

});

app.listen(3000, () => {
    console.log("Server is listening on PORT: 3000");
});

// API KEY
// 8a8c6cb060980945bf7bbac525caec55

