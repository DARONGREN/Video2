import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRouters from "./routes/user.js"
import videoRouters from "./routes/video.js"
import commentRouters from "./routes/comments.js"
import authRouters from "./routes/auth.js"
import cookieParser from "cookie-parser"

const app = express()
dotenv.config()

const connect =() => {
    mongoose.connect(process.env.MONGO).then(() =>{
        console.log("connect to DB")
    })
    .catch((err) =>{
        throw err;
    })
}

app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRouters)
app.use("/api/user", userRouters)
app.use("/api/videos", videoRouters)
app.use("/api/comments", commentRouters)

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "sth wrong";
    return res.status(status).json({
        success:false,
        status,
        message,
    })
})

app.listen(8800, ()=>{
    connect();
    console.log("connected")
})