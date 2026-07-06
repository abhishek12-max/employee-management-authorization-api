const getdashboard= async (req,res) => {
    res.status(200).json({
        message:"admin dashboard"
    })
}


module.exports={
    getdashboard
}