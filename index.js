import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import categoryroute from "./routes/categoryroute.js";
import cors from "cors";
import productRoute from "./routes/productRoute.js";

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json()); //instead of body-parser
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryroute);
app.use("/api/v1/product", productRoute);

app.get("/", (req, res) => {
  res.send({
    msg: "logged",
  });
});

app.listen(process.env.port, () =>
  console.log(`Listening port ${process.env.port}`.bgGreen.white)
);
