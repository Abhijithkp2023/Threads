import express from 'express';
import dotenv from "dotenv";
import connectDB from './db/connectDB.js';

dotenv.config();
connectDB();
const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.json());  // to parse JSON data from req.body
app.use(express.urlencoded({extended: true}));



app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`)
});