const jwt = require('jsonwebtoken');
const User = require('../models/User');
exports.IsAuth = (req,res,next)=>{
  //  const token = req.header.jwt;
  //  console.log(token);
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
      const token = req.headers.authorization.split(" ")[1];
      console.log(token);
      if (token){
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decodedToken)=>{
            if (err){
                return res.status(403).json({ msg: 'Forbidden',err });
            }
            else{
                next();
            }
            
        })
    }
    else{
        return res.status(401).json({ msg: 'Forbidden' });
    }
    
    }


}
exports.role = (req,res,next)=>{
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        const token = req.headers.authorization.split(" ")[1];
    if (token){
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decodedToken)=>{
            if (err){
                return res.status(403).json({ msg: 'Forbidden',err });
            }
            User.findById(decodedToken.id)
            .then(user=>{
                if (user.role === 'admin')
                {
                    next();
                } else {
                    return res.status(401).json({ msg: 'Forbidden' });

                }
            })
        })
    }
    else{
        return res.status(401).json({ msg: 'Forbidden' });
    }
    
}
}