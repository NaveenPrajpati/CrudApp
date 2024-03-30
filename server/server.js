const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const router = require("./routes/taskRoute");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/task", router);

mongoose.connect(process.env.BASE_URL, {
  useNewUrlParser: true,
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
