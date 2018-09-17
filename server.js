// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/api/timestamp', function(request, response) {
  
    var currentDate = new Date();
  
    response.send({"unix": currentDate.getTime(), "utc" : currentDate.toUTCString() });    
  
});

app.get('/api/timestamp/:date_string', function(request, response) {  
  
  try{
    
    var dateString = request.params.date_string;
    var parsedDate = new Date(dateString);
    
    if(parsedDate.toString() === "Invalid Date"){
      dateString = parseInt(request.params.date_string);
      parsedDate = new Date(dateString);
    }
    
    var unixString = parsedDate.getTime();
    
    var utcString = parsedDate.toUTCString();
    
    response.send({"unix": unixString, "utc" : utcString });
    
  }catch(e){
    
    response.send({"error" : "Invalid Date" });
    
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
