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
const Chat = require('./model/chat');
const Group = require('./model/group');

User.hasMany(Chat);
Chat.belongsTo(User);

Group.hasMany(Chat);
Chat.belongsTo(Group);

User.hasMany(Group);
Group.belongsTo(User);

//Routes
const userRoutes = require('./routes/user');
const chatRoutes = require('./routes/chat');
const groupRoutes = require('./routes/group');

app.use(bodyParser.json({ extended: false }))

app.use('/user',userRoutes);
app.use('/chat',chatRoutes);
app.use('/group',groupRoutes);


sequelize
.sync()
    .then(res => {
        // console.log(res);
        app.listen(3000);
    })
    .catch(err => console.error(err))

