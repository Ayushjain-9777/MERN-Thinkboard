import express from "express";
import notesRoutes from "./Routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 5001;      //setting port value
const app = express();       //Creating an express app


// middleware - .use() is used to access a middleware
app.use(cors({
    origin: "http://localhost:5173",
}));
app.use(express.json());    // this middleware will parse json bodies: req.body
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);     //Controllers

// What is an end point?
// An end point is a combination of an URL + HTTP method that lets the client interact with a specific resource

connectDB().then(() => {       //connecting database
    app.listen(5001, () => {                        //then, listening to app on PORT 5001 and logging on console
        console.log("Server started on PORT: ",PORT);
    });    
});        

