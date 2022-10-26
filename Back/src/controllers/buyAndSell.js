const ws = require('ws');

function buyAndSell (res , result) {
  const regex1 = /(ETH-USD)/g;
  const regex2 = /(BTC-USD)/g;
  const w = new ws('wss://api-pub.bitfinex.com/ws/2');
  var index = 0;
  var coin ="";
  var lista=[];

  w.on('message', function(msg) {
    if (index <28 && index >=3){
      lista.push(msg);
     }else if (index === 28) {
      const list = JSON.parse("[" + lista + "]");
      console.log(list);
      res.end(JSON.stringify({'lista' : list , 'coin':coin}));
    }
    index=index+1;
  })

  let msgBTC = JSON.stringify({ 
    event: 'subscribe', 
    channel: 'book', 
    symbol: 'tBTCUSD',
    prec:'P0',
    freq:'F0',
    len:'100'
  })
  let msgETH = JSON.stringify({ 
    event: 'subscribe', 
    channel: 'book', 
    symbol: 'tETHUSD' ,
    prec:'P0',
    freq:'F0',
    len:'100'
  })
  
  if (result.length != 7) {
     res.end(JSON.stringify({"error1":"Input incorrect the length is more 7 chars"}))
   } else if (!(regex1.test(result)) && !(regex2.test(result))) {
     res.end(JSON.stringify({"error2":"Coin not supported"}));  
   } else {
     if (result === "ETH-USD"){
       coin="ETH";
       w.on('open', () => w.send(msgETH))
     }else {
       coin="BTC";  
       w.on('open', () => w.send(msgBTC))
     }
  }
 }

module.exports = {buyAndSell};