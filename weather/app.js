const express = require('express');
const https = require('https');
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({
  extended: true
}));


app.get("/", function(req,res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/" , function(req,res) {
    
let city = req.body.cityName;
    let apikey = "2c94c0c124ad131937965d24a0d57e77";
    let units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apikey+"&units="+units;

    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data" , function(data) {
            let weather = JSON.parse(data);
            let temp = weather.main.temp;
            let description = weather.weather[0].description;
            let icon = weather.weather[0].icon;
            let imageURL = " http://openweathermap.org/img/wn/"+icon+"@2x.png"

            res.write("<p>The weather description is " + description + " </p>");
            res.write("<h1>The weather in "+city+" is " + temp + " degree celsius</h1>" );
            res.write("<img src="+imageURL+">")
            res.send();

        })
    })
})




app.listen("3000",()=> {
    console.log("server is running in port 3000");
})


