const path = require('path'); //Load file path

require('dotenv').config({path: "./env"});
require('dotenv').config();

const connectDB = require('./server/config/db');
connectDB();

const errorHandler = require('./server/middleware/errorHandler');

const express = require('express');
const app = express();


//Import Routes
const usersRouter = require('./server/routes/userRouter.js');

//Allow Access to Server from Server Address
const cors = require('cors');
app.use(cors());

//Allow Parsing of Req.Body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.get('/*', (req, res)=>res.send('Yup'));

//Use Routes as Middleware
app.use('/api/users', usersRouter);

//Serve React Build Files in the Server to display the Client to the User
app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', (req, res) => {
    return res.sendFile(path.join(__dirname, './client/build/index.html'))
});

//Use Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=> console.log(`Server has Started on Port ${PORT}`))