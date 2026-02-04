require("dotenv").config({ path: "./process.env" });
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/post"));

app.listen(5000, () => console.log("Server running on 5000"));
