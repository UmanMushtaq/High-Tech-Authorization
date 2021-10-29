const User = require('../models/User');

exports.postUpdateUser = (req,res,next)=>{
    try {
        const {email,name} = req.body;
    
        User.findOne({email:email})
        .then(user=>{
            user.email= email;
            user.name=name;
            return user.save()
            .then(result=>{
                res.status(200).json({msg:'Updated user', result});
            })
            .catch(err=> {return res.status(500).json({msg:'Not Update',err})})
        })
        .catch(error=>{
            return res.status(500).json({msg:'Error Updated', error});
        })
    } catch (error) {
        return res.status(500).json({msg:'Error Updated', error});

    }
  
}
exports.DeleteUser = (req,res,next)=>{
    const {email} = req.body;
    
    User.findOneAndRemove(email,(err,result)=>{
        if (err){
            return res.status(500).json({msg:'Error in deletion', err})
        }
        return res.status(200).json({msg:'User Deleted', result});
    } )
}
exports.getUpdateUser = (req,res,next)=>{
    console.log('get Dashboard');

}
