const userRouter = require("./user/user.route");
const express = require('express');

const subApp = express();

subApp.use(express.json())
subApp.use(userRouter);

module.exports = subApp;
