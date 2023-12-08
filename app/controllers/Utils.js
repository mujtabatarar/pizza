const jwt = require('jsonwebtoken');
const { errorHandler } = require("./errHandler");
exports.authenticate = async (req, res, next) => {
  try{
    let token = req?.headers?.authorization?.split("Bearer ")[1];
    console.log("teri walida ki", req?.headers?.authorization)
    jwt.verify(token, process.env.JWT_TOKEN_KEY, (err,data)=>{
      if ( err ) { 
        res.send(errorHandler[401]); 
      } else {
        req.user = data;
        next();
      }
    })
  } catch(err){
    console.log("error", err);
  }
}