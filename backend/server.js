import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import uploadRoutes from './routes/uploadRoutes.js'
import coveruploadRoutes from './routes/coveruploadRoutes.js'
import connectDb from "./utils/db.js";
import userRoutes from './routes/userRoutes.js'
import blogRoutes from "./routes/blogRoutes.js"
import path from 'path'
dotenv.config();
const port = process.env.PORT || 2000;

connectDb();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/quirky/users", userRoutes)
app.use("/quirky/pfuploads", uploadRoutes)
app.use("/quirky/coveruploads",coveruploadRoutes )
app.use("/quirky/blogs",blogRoutes)

app.get("/", (req, res) => {
    res.send("Api is running");
});

const __dirname = path.resolve();
app.use("/pfuploads", express.static(path.join(__dirname, "/pfuploads")));
app.use("/coveruploads", express.static(path.join(__dirname, "/coveruploads")));

app.use(notFound)
app.use(errorHandler)


app.listen(port, () => console.log(`Server is running on port ${port}`));