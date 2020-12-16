var express = require("express");
var app = express();
var router = express.Router();

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