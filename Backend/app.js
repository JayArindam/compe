const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

require("./conn/conn");

const User = require("./routes/user");
const Admin = require("./routes/admin");
const orderRoutes = require("./routes/orders");

app.use(express.json());
app.use(cors());

app.use("/api/v1", User);
app.use("/api/v1/admin", Admin);
app.use("/api/v1/orders", orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
