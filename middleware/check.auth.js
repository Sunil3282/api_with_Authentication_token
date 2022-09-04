const jwt = require('jsonwebtoken');

function checkAuth(req,res,next){
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.varify(token,process.env.JWT_KEY)
        //let say user data, so that we can use in all req parameter
        req.userData = decodedToken;
        next();
    }catch(error){
        //401 unauthorize
        return res.status(401).json({
            message:"Invalid or Expire token",
            error:error
        })

    }
}
module.exports = {
    checkAuth:checkAuth
}