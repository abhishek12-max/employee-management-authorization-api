const authorizedRole= (...roles)=>{
     return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                message:"forbeddin"
            })
        }
        next();
     }
}

module.exports= authorizedRole;