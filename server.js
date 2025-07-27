import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import todoRouter from "./routes/todoRoute.js";
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
const dbuser = encodeURIComponent(process.env.DBUSER);
const dbpass = encodeURIComponent(process.env.DBPASS);

mongoose
  .connect(`mongodb://localhost:27017/todo`)
  .then(() => {
    app.listen(8081, () => {
      console.log("Server Started");
    });
  })
  .catch((err) => console.log("DB Error", err));

// mongoose
//   .connect(
//     `mongodb+srv://${dbuser}:${dbpass}@cluster0.ts55vzb.mongodb.net/merncafe?retryWrites=true&w=majority&appName=Cluster0`
//   )
//   .then(() => {
//     app.listen(8081, () => {
//       console.log("Server started");
//     });
//   }).catch((err) => console.log("DB Error", err));

app.use("/api/users", userRouter);
app.use("/api/todo", todoRouter);
