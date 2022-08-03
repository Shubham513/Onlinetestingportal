const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
dotenv.config({path:"./config.env"});
const methodOverride = require('method-override');
require('./model/db/conn');


app.use(express.json());
app.use(methodOverride('_method'));

const middeleware = (req,res,next) =>{
    next();
}
const PORT=process.env.PORT;

const User = require('./model/schema');

app.use(require('./router/auth'));

app.listen(PORT,()=>{
    console.log("Servar at:",{PORT});
});
