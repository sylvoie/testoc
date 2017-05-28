var express     = require("express"),
    app         = express(),
    seedDB      = require("./seeds");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

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



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Movie App has started!!!");
});