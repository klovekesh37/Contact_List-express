const express=require('express');
const path=require("path");
const { brotliDecompressSync } = require('zlib');
const port=8100;

const db= require('./config/mongoose');
const Contact=require('./models/contact');
const app=express();

app.set("view engine","ejs")

app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded());

// incluse the css and js and images static files...use middleware
app.use(express.static('assets'));

//own Middleware 1 
app.use(function(req,res,next){
    // req.myName="Arpan"
    // console.log("Middleware 1 called");
    next();
})

//own Middleware 2
app.use(function(req,res,next){
    // console.log("my Name from Middleware 2",req.myName);
    next();
})

app.get('/',function(req,res){
    // console.log("myName from get root",req.myName);

    Contact.find({},function(err,contacts){
        if(err){
            console.log("Error in fetching contact from db");
            return;
        }

        return  res.render("home",
        {
            title:"contact list",
            contact_list:contacts
        });
    })
   
});

var contactList=[
    {
        name:'Arpan',
        phone:'123345555'
    },
    {
        name:"CN",
        phone:"3268232424"
    },
    {
        name:"dnjkefer",
        phone:"67352434223"
    }
]

// app.get('/practice',function(req,res){
//     return  res.render("practice",{
//         title:"Contact List",
//         contact_list:contactList
//     });
// });

app.get('/home',function(req,res){
    return  res.render("practice",{
        title:"Contact List",
        contact_list:contactList
    });
});


app.post("/create-contact",function(req,res){
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // })
    // console.log(contactList);
    // return res.redirect("/");

    
    Contact.create({
        name:req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){
            console.log("Error in creating contact");
            return;
        }
        console.log("##############",newContact);
        return res.redirect('back');
    });

});


// delete contact that take request from the close button 

app.get('/delete-contact/',function(req,res){
    // console.log(req.params);
    console.log(req.query);

    //grt the id from the url
    let id=req.query.id;

    //find the contact in db using id
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("Error in deleting");
            return;
        }

        return res.redirect('back');
        
    });

})

app.listen(port,function(err){
    if(err){
        console.log(err);
    }
    console.log("Server is running on port: ",port);
})

