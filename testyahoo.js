var yahooFinance = require('yahoo-finance');

yahooFinance.snapshot({
    symbol: 'appl'
}, function(err, snapshot){
    if(err){
        throw err;
    }else{
        console.log(snapshot);
    }
})