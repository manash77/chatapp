require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const Helmet = require('helmet');
const Morgan = require('morgan');
const sequelize = require('./util/database');

const app = express();

app.use(cors());
// app.use(Helmet());
// app.use(Morgan('combined'));

//model
const User = require('./model/user');

app.use(bodyParser.json({ extended: false }))

//Routes
const userRoutes = require('./routes/user');

app.use('/user',userRoutes);



sequelize
.sync()
    .then(res => {
        // console.log(res);
        app.listen(3000);
    })
    .catch(err => console.error(err))

