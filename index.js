const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


var dailyExpenseController = require('./dailyExpenseController');
app.use("/daily",dailyExpenseController);

app.listen(8989,()=>{
    console.log("Listening on port 8989...");
})