var yahooFinance = require('yahoo-finance');
var mongoClient = require('mongodb').MongoClient;

var uri = "mongodb://localhost:27017/stocks";


function getStockData(ticker,cb){
    var data = {}

    yahooFinance.snapshot({
            symbol: ticker
        }, function(err,snapshot){
            if(err){
                throw err;
            }
            else {
                console.log(snapshot);
                cb(snapshot);
            }
        });
        
    //return data;
}

function insertSnapshot(data){
    mongoClient.connect(uri, function(err,db){
        //console.log(data);
        var collection = db.collection("stocks");
        collection.insert(data, function(err,results){
            if (err){
                throw err;
            }
            else {
                console.log(results);
            }
            db.close();
        })
    })
}

function insertHistorical(data){
    mongoClient.connect(uri, function(err,db){
        var collection = db.collection("historical");
        var theData = {};
        
        collection.insertMany(data, function(err, results){
            if(err){
                throw err;
            }
            else {
                //console.log(results);
            }
            db.close();
        })
    })
}

function getHistoricalData(ticker, cb){
    yahooFinance.historical({
        symbol: ticker
    }, function(err, data){
        
        //snapshot["historical"] = data;
        //console.log(snapshot);
        cb(data);
    });
}


//getHistoricalData("aapl", insertSnapshot);
getStockData("amzn", insertSnapshot);
getHistoricalData("amzn", insertHistorical);

// yahooFinance.historical({
//     symbol: 'AAPL',
//     from: '2012-01-01',
//     to: '2017-01-20',
//     period: 'd'
// }, function(err, quotes){
//     console.log(quotes);
// });

//var blah = stockData.snapshot('AAPL');





// yahooFinance.snapshot({
//     symbol: 'AAPL'

// }, function(err, snapshot){
//     console.log(snapshot);
// })