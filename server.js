const express = require('express');
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');

const mongoose = require('mongoose');
const connectDb = require('./config/dbConnection');

connectDb();

const app = express();
app.use(express.json())
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// app.use((error,req,res,next)=>{
//     error.statusCode = error.statusCode || 500;
//     res.status(error.statusCode).json({status:error.statusCode})
// })
app.use(errorHandler);

//Porting
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
// mongoose.connect(mongoDb).then((err)=>{
//     if (err) {
//         console.log("Something wrong");
//     }else{
//         console.log("Db connected",mongoDb);
//     }
//     console.log("Db connected",mongoDb);

// })