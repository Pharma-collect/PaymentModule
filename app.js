if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
const stripe = require('stripe')(stripeSecretKey)

var express = require("express");
var app = express();
var router = express.Router();
app.use(express.static('public'))



// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.json({message : "HelloWorld"});
});

app.use("/", router);

app.listen(PORT, function () {
  console.log('Listening on port 8080!')
})

app.get('/checkout', function(req, res){

  res.render('./public/checkout.html', {
    stripePublicKey : stripePublicKey
  })
})

app.post('/purchase', function(req, res){
  console.log('purchase')
  stripe.charges.create({
    amount : total * 100,
    source : req.body.stripeTokenId,
    currency : 'eur'
  }).then(function(){
    console.log('Charges successful')
    res.json({message : "Successfully purchased items"})
  }).catch(function(){
    console.log("Charges fail")
    res.status(500).end()
  })
})

