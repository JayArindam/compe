const express = require('express');
const app = express();
require("dotenv").config();
require("./conn/conn");
// require("./models/associations");

const User = require("./router/user");

app.use(express.json());

app.use("/api/v1", User);

app.listen(process.env.PORT,()=>{
    console.log(`Server running on ${process.env.PORT}`);
} )