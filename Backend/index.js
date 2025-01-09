import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/user.Routes.js";
import blogRoute from "./routes/blog.Routes.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from 'cloudinary';
import cors from "cors";

const app = express();
dotenv.config()
const port = process.env.PORT;
const MONGO_URL = process.env.MONGO_URI;



//middleware

app.use(express.json());
app.use(cookieParser())

// Allow requests from your frontend
app.use(cors({
    origin: process.env.FRONTEND_URL, // Frontend URL
    credentials: true,
    methods:["GET","PUT","POST","DELETE"],
}));



app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}));


// DB Code
try {
    mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");
}
catch (error) {
    console.log(error);


}
//defining route
app.use("/api/users",userRoute)
app.use("/api/blogs",blogRoute)

//CLOUDINARY
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})