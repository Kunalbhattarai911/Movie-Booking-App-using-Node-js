import express from "express";
import dotenv from "dotenv";
import dbConnection from "./databaseConenction/db.connection.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  dbConnection();
  console.log(`Server is Running On The PORT ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user/auth", authRouter);
app.use("/api/user", userRouter);
