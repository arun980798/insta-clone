const jwt = require("jsonwebtoken")



async function identifyuser(req,res,next) {
  
  
  const token = req.cookies.token

  if(!token){
    res.status(401).json({
      message:"token is not present "
    })
  }
let decoded ;
try{
  decoded = jwt.verify(token,process.env.JWT_SECRET)
}catch(err){
   return res.status(401).json({
      message: "token expire or unauthreise acces ",
    });
}
  req.user = decoded;


  next();
}


module.exports = identifyuser