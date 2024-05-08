import express from 'express';
import dotenv from "dotenv";
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/userRoutes.js"

dotenv.config();
connectDB();
const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.json());  // to parse JSON data from req.body
app.use(express.urlencoded({extended: true}));  // to parse data from req.body
app.use(cookieParser()); 


app.use('/api/users' ,userRoutes)

app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`)
});