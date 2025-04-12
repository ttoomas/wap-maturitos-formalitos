import express from'express';
import cookieParser from'cookie-parser';
import cors from'cors';
import mongoose from 'mongoose';

import indexRouter from './routes/index.js';
import dogsRouter from './routes/dogs.js';

mongoose
    .connect("TODO")
    .then(() => console.log("Mongoose connected"))
    .catch(err => console.log(err))


const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/dogs', dogsRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})