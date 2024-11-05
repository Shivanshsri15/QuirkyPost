import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import connectDb from "./utils/db.js";
import userRoutes from './routes/userRoutes.js'

dotenv.config();
const port = process.env.PORT || 2000;

connectDb();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/quirky/users", userRoutes)

app.get("/", (req, res) => {
    res.send("Api is running");
});

app.use(notFound)
app.use(errorHandler)


app.listen(port, () => console.log(`Server is running on port ${port}`));