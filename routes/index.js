var express = require('express');
var router = express.Router();var mongoClient = require('mongodb').MongoClient;

var uri = "mongodb://localhost:27017/stocks";

/* GET home page. */
mongoClient.connect(uri, function(err,db){
  var collection = db.collection("stocks");
  router.get('/', function(req, res, next) {
    collection.find({}).toArray(function(err,stocks){
      if(err){
        throw err;
      }else {
        console.log(stocks);
        res.render('index',{stocks: stocks});
      }
    });
    //res.render('index', { title: 'Express' });
  });
});
module.exports = router;
