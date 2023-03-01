const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
var newListItems=["Buy Food","Cook Food","Eat Food"];
let workItems=[];
app.get("/",function(req,res){
    var today=new Date();
    var options={
        weekday: "long",
        day:"numeric",
        month: "long",
    };
    var day=today.toLocaleDateString("en-US",options);
    res.render("list",{listTitle:day,newListItem:newListItems});

});
app.post("/",function(req,res){
    let add=req.body.newItem;
    if(req.body.button ==="Work list"){
        workItems.push(add);
        res.redirect("/work");
    }else{
        newListItems.push(add);
        res.redirect("/");
    }
});

app.get("/work",function(req,res){
    res.render("list",{listTitle:"Work list",newListItem:workItems });
});
app.listen(3000,function(req,res){
    console.log("listening on port no. 3000")
}); 
