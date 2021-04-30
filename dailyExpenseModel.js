const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/expensetrackersystem", {useNewUrlParser: true, useUnifiedTopology: true})
    .then( () => console.log("Database connected successfully!"))
    .catch( (error) => console.log("Error"));


const dailyExpense = mongoose.Schema({
    item : String,
    amount : Number
});
    
const DailyExpenseModel = mongoose.model("ditem",dailyExpense);
    
    
module.exports = DailyExpenseModel;