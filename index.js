const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require("body-parser");
const {
    urlencoded
} = require("body-parser");
const https = require("https");
const {
    response
} = require("express");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");

});

app.post("/", function (req, res) {

    const query = req.body.Fname;
    const dd = req.body.Lname;
    const rr = req.body.mail;

    const data = {
        members: [{
            email_address: rr,
            status: "subscribed",
            merge_fields: {
                FNAME: query,
                LNAME: dd
            }
        }]

    };

 

    const jsonData = JSON.stringify(data);

    const url = "https://us12.api.mailchimp.com/3.0/lists/dbfeb09a58";

    const options = {
        method: "POST",
        auth: "wasiullah296@gmail.com:3cdb8cc4ba5596e97ffc6540a6ceaca3-us12"
    }


    const request = https.request(url, options, function (response) {

        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/index1.html");
        } else {
            res.sendFile(__dirname + "/index2.html");
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();


});



app.post("/failure", function(req, res){
    res.redirect("/");
});








app.listen( process.env.PORT || 3000, function (req, res) {

    console.log("server is up and running at 3000 port")
});





// dbfeb09a58
// 3cdb8cc4ba5596e97ffc6540a6ceaca3-us12