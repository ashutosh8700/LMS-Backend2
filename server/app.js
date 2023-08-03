// importing express
// import express from 'express';
// import cookieParser from 'cookie-parse';
const express = require('express');
const cors = require('cors');
var cookieParser = require('cookie-parser');
// const cookieParser = require('cookie-parse');
const userRoutes = require('./routes/user.routes');
const errorMiddleware = require('./middlewares/error.middleware');

// creating instance
const app = express();

// middle ware
app.use(express.json());

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true
}))

app.use(cookieParser());
// middle ware

app.use('/ping', (req,res) => {
    res.send('Pong');
});

// 3 route config
app.use('/api/v1/user', userRoutes);

app.all('*', (req,res) =>{
    res.status(404).send('OOPS 404 Page not found'); 
})

app.use(errorMiddleware);

module.exports = app;