const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const http = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});


app.post("/", function (req, res) {
    const email = req.body.email;
    const FName = req.body.FName;
    const LName = req.body.LName;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: FName,
                    LNAME: LName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);


    const url = "https://us14.api.mailchimp.com/3.0/lists/0a273aafd8";

    const options = {
        method: "POST",
        auth: "jishnu:9c00b7a5caa89acfb7c754995d71f3ac-us14"
    }

    const request = http.request(url, options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();
});

app.post("/failure", (req, res) => {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function (req, res) {
    console.log("server running");
});


// audienceID = 0a273aafd8




//apiKey= 9c00b7a5caa89acfb7c754995d71f3ac-us14