const express = require("express");
const app = express.Router();


const DailyExpenseModel = require('./dailyExpenseModel');

app.route("/")
.post( async (req,res) =>{
    var { item, amount } = req.body;
    console.log("Inside insert one");

    try{
        newItem = new DailyExpenseModel({item,amount});
        await newItem.save();
        res.send(newItem);
    }catch(e){
        console.log(e);
    }
})
.get( async (req,res) =>{
    var {id} = req.body;
    console.log("Inside find one");
    console.log(typeof(id));
    try{
        let item = await DailyExpenseModel.findOne({_id:id});
        if(!item){
            res.send("No such record exist");
        }else{
            res.send(item);  
        }
    }catch(e){
        console.log(e);
    }

})
.put( async (req,res) =>{
    var {id,item,amount} = req.body;
    console.log("Inside Update One");

    try{
        let updatedItem = await DailyExpenseModel.updateOne( { _id:id },{ $set: {item,amount} } );
        console.log(updatedItem);
        res.send(updatedItem);
    }catch(e){
        console.log(e);
    }

})
.delete( async (req,res) =>{
    var {id} = req.body;
    console.log("Inside deleteOne");

    try{
        let delItem = await DailyExpenseModel.deleteOne({_id : id});
        res.send(delItem);
    }catch(e){
        console.log(e);
    }

});

app.get("/getAll", async (req,res) => {
    try{
        let items = await DailyExpenseModel.find();
        if(!items){
            res.send("Items doesn't exist");
        }else{
            res.send(items);
        }  
    }catch(e){
        console.log(e);
    }
});

app.post("/insertMany", async (req,res) => {
    var arrofJson = req.body;

    console.log("Inside insert many");
    var arrayj = [];

    try{
        arrofJson.forEach(element => {
             arrayj.push(new DailyExpenseModel(element));
        });
    
        itemsLog = await DailyExpenseModel.insertMany(arrayj);
        res.send(itemsLog);

    }catch(e){
        console.log(e);
    }

});

app.delete("/deleteMany", async (req,res) => {
    var arrOfId = req.body;

    try{
        let delitems = await DailyExpenseModel.deleteMany({_id : arrOfId});
        res.send(delitems);
    }catch(e){
        console.log(e);
    }
})


//Function calls

//insertOne("lays",10);
//insertMany
arrofJson = [
    {
        "item" : "milk",
        "amount" : 35
    },
    {
        "item" : "apples",
        "amount" : 60
    },
    {
        "item" : "bandana",
        "amount" : 40
    }
];
//insertMany(arrofJson);
// deleteOne("601cdb3272f0cc161ccf928c");
//darrofitem = ["601cdb3272f0cc161ccf928b","601cdb3272f0cc161ccf928d"];
//deleteMany(darrofitem);
//findOne("601e1726a253ad2cc82fba8d");
//updateOne("601e1726a253ad2cc82fba8b","Hair Oil",240);

module.exports = app;
