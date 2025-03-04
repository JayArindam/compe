const express = require('express');
const app = express();

require("dotenv").config();
require("./conn/conn");

const User = require("./routes/user");
const Admin = require("./routes/admin");

app.use(express.json());

app.use("/api/v1", User);
app.use("/api/v1/admin", Admin);

app.listen(process.env.PORT,()=>{
    console.log(`Server running on ${process.env.PORT}`);
} )

// 1. sign-up
// 2. sign-in
// 3. add components