import Express from "express"
import dotenv from "dotenv"
import dbConnect from "./config/db.js"
import userRoute from "./routes/userRoute.js"
import cors from "cors"
dotenv.config()
const app = Express()
const PORT = process.env.PORT

app.use(cors())
app.use(Express.json())
app.use("/api", userRoute)

app.get("/",(req,res)=>{
    res.send("Tejas")
})
app.listen(PORT,()=>{
  
    console.log(`Server is running on port ${PORT}`)
})
dbConnect()