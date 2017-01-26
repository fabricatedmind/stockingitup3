var yahooFinance = require('yahoo-finance');
var mongoClient = require('mongodb').MongoClient;

var uri = "mongodb://localhost:27017/stocks";


var today = new Date();
var ticker = "AMZN";
ticker.toLowerCase();
//var today = 7;

if(today.getDay() != 7 && today.getDay() != 0){
    var formatDate = today.getFullYear() + "-"+today.getMonth()+1 + "-"+today.getDate();
    console.log(formatDate);
    mongoClient.connect(uri, function(err,db){
        if(err) throw err;
        var collection = db.collection("historical");
        yahooFinance.historical({
            symbol: ticker,
            from: '2017-01-23',
            to: '2017-01-23',
            period: 'd'
        }, function(err, quote){
            if(err){
                throw err;
            }
            else {
                collection.insertMany(quote, function(err, results){
                    if(err){
                        throw err;
                    }
                    else {
                        console.log(results);
                    }
                    db.close();
                })
                //console.log("data: " +JSON.stringify(quote));
            }
        })
        
    })
}
else {
    console.log("rats");
}
