require("dotenv").config();
const app= require("./app");
const connectdb= require("./config/db");
  connectdb();
app.listen(process.env.PORT,(req,res)=>{
    console.log(`server start at port  ${process.env.PORT}`);
})