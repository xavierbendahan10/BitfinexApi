const corsOpts           = {origin: '*',methods: ['GET','POST',],allowedHeaders: ['Content-Type',],};
const express            = require('express');
const app                = express();
const cors               = require('cors')
const bestPriceAndAmount = require("./src/controllers/bestPriceAndAmount");
var bodyParser           = require('body-parser');  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOpts));

var server = app.listen(8000, function () {  
  var host = "127.0.0.1" 
  var port = server.address().port  
  console.log("Example app listening at http://%s:%s", host, port)  
 })  

 app.post('/trade/coin', (req, res) => {  
  response = {  
      nameCoin:req.body.nameCoin,  
      amount : req.body.amount,
      price:req.body.price ,
      divisa:req.body.divisa,  
      type:req.body.type
  };  
  console.log(response);  
  returnResultCoin(res,response.nameCoin,2);
})


app.post('/bestprice/price', (req, res) => {  
  response = {  
      nameCoin:req.body.nameCoin,  
  };  
  bestPriceAndAmount.bestPriceAndAmount(res,response.nameCoin); 
})

