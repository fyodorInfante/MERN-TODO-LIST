// dotenv library and config
import dotenv from "dotenv";
dotenv.configDotenv();

// express and mongoose and cors
import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import morgan from "morgan";

// routes
import todoRoutes from './routes/todoRoutes.js'

// express initialization
const app = express();

app.use(cors());
app.use(morgan('tiny'));

app.use(express.json());

app.use('/todo', todoRoutes)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected");
    });
  })
  .catch((error) =>{
    console.log(error)
  })