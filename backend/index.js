import express, { request } from "express";
import {PORT,mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js'
import cors from 'cors';

const app = express();

//middleware for parsing request body
app.use(express.json());

//middleware for handling cors policy
//option 1: Allow all origin with default of cors(*)
// app.use(cors());
//option 2: Allow custom origins
// app.use(cors({
//     origin: 'https://localhost:3000',
//     method: ['GET','POST','PUT','DELETE'],
//     allowedHeaders: ['Content-Type'],
// })
// );
app.use(cors({
    origin: ['https://bookcollection-r947.onrender.com', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));


app.get('/',(request,response)=>{
    console.log(request)
    return response.status(234).send("Welcome check ")
});

//middleware
app.use('/books',booksRoute); //fro each request prefix /books 
//any request with /books will be handled by booksRoute router

//to connect db
mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('App connected to database');
        app.listen(PORT,()=> {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error)=>{
        console.log(error);
    });