const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const appID = "0ff09c2f9675463886e12d32202647e4";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&APPID=" + appID + "&units=" + units;

  https.get(url, function(response) {

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const description = weatherData.weather[0].description
      const temp = weatherData.main.temp
      const icon = weatherData.weather[0].icon
      res.write("<h1>The weather in " + query + " is currently " + description + "</h1>");
      res.write("<h2>The temperature is " + temp + " degrees C.</h2>");
      res.write("<img src='https://openweathermap.org/img/wn/" + icon + "@2x.png' alt='Weather Icon'>");
      res.send();
    });
  });
});

app.listen(3000, function(){
  console.log("Server started on port 3000");
});
