var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http')

var app =express();

var foursquare = (require('foursquarevenues'))('CLIENTIDKEY', 'CLIENTSECRETKEY');

   

 
   

/////////////////////////////////////////////
/*var logger = function(req,res,next){
    console.log('Logging');
    next();
}
app.use(logger);*/
////////////////////////////////////////////

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'))

//Body Parse Middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'public')));



app.get('/',function(req,res){ 
  res.render('index',{
            title:"Search Fields"
        });
})

app.post('/forms',function(req,res){

  var searchPlace = req.body.searchPlace;
  var searchQuery = req.body.searchQuery;
  var params = {
    "section":searchQuery,
      "near": searchPlace,
      "v":"20171115" //Date in formay YYYYMMDD
   };
  foursquare.exploreVenues(params, function(error, venues) {
        if (!error) {
         //console.log(JSON.stringify(venues));
         var jsonPlace = [venues]; 
         res.render('forms',{
            title:"Search Result",
            place:searchPlace, 
            searchitem:searchQuery,
            usersnew:jsonPlace,
        });
         
        }
    });
  
})

app.listen(3000,function(){
    console.log('Server live');
})