const express= require("express");
const cookieparser= require("cookie-parser");
const authRoutes=  require("./routes/auth.route");
const app= express();
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use(cookieparser());
module.exports= app;