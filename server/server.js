import express from 'express'
import { config } from 'dotenv'
import connectToDb from "./src/config/db.js"
import cors from 'cors'
import authRoutes from "./src/routes/auth.routes.js"
import taskRoutes from "./src/routes/task.routes.js"

config()
const app= express()


app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL],
    methods: ["GET", "POST", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))

//auth Routes
app.use('/api/auth', authRoutes)
app.use('/api/task',taskRoutes)



const startServer= ()=>{
    try {
        connectToDb()

        app.listen(process.env.PORT, ()=>{
            console.log("server started on PORT", process.env.PORT)
        })

    } catch (error) {
        console.log("error connecting to mongoDb")
    }
}

startServer()