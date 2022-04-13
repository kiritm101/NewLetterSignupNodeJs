const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");

app.use(express.static("public/css"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function (req, res) {
  var fName = req.body.fName;
  var lName = req.body.lName;
  var email = req.body.email;
  console.log(fName, lName, email);
  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: { FNAME: fName, LNAME: lName },
      },
    ],
  };

  var jsonData = JSON.stringify(data);
  const url = "https://us14.api.mailchimp.com/3.0/lists/35eb8030be";
  const options = {
    method: "POST",
    auth: "kishore:4a03dd761a0f46140477651405d4c55f-us14",
  };
  const request = https.request(url, options, function (response) {
    if (response.statusCode == 200) {
      res.send("successfully subscribed to newsletter!");
    } else {
      res.send("There was an error with signing up Please try again!");
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port 3000");
});

//4a03dd761a0f46140477651405d4c55f-us14
//35eb8030be
