const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const MssgRoute = require('./routes/messagesRoute')

const app = express();
require("dotenv").config();


app.use(cors());
app.use(express.json());

app.use("/api/auth",userRoutes)
app.use("/api/messages",MssgRoute)

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("connection established");
})
.catch((err)=>{
    console.log("error in connecting to database: ", err.message);
})
const server = app.listen(process.env.PORT, ()=>{
    console.log(`server started on port ${process.env.PORT}`)
})