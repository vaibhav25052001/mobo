import express from 'express'
import dotenv from 'dotenv'
import ConnectDB from '../backend/config/db.js'
import authRoutes from '../backend/routes/authRoute.js'
//cors-> Cross Origin Resource Sharing middleware is used in web applications to enable cross-origin HTTP requests.
import cors from 'cors'
import categoryRoutes from '../backend/routes/categoryRoute.js'
import productRoutes from '../backend/routes/productRoute.js'
import path from 'path'

//config env
dotenv.config()

//database connect
ConnectDB();

const app=express();

app.use(express.json())

//middleware for handling routes
app.use(cors())

//routes
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/product',productRoutes)

app.get("/", (req, res) => {
    res.send("<h1>Welcome to ecommerce app</h1>");
  });
const PORT=process.env.PORT || 9950;
app.listen(PORT,()=>{
    console.log(`Server started on ${process.env.DEV_MODE} on ${PORT}`)
})
export default app