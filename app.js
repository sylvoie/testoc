var express     = require("express"),
    app         = express(),
    seedDB      = require("./seeds");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

var server_port = process.env.HELLOWORLD_PORT_8080_TCP_PORT || 8080;
var server_ip_address = process.env.HELLOWORLD_PORT_8080_TCP_ADDR || '127.0.0.1';

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.nombreImageParligne = 3;
   res.locals.result = 0;
   next();
});

app.get("/", function(req, res){
   res.render("main", {filmotheque: seedDB});
});


app.get("/results", function(req, res){
    var query = req.query.search;
    var url = "http://omdbapi.com/?s=" + query;
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200) {
            var data = JSON.parse(body)
            res.render("results", {data: data});
        }
    });
});

app.listen(server_port, function () {
  console.log( "Listening on port " + server_port )
});