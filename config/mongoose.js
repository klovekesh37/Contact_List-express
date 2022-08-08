// require the package
const mongoose= require('mongoose');

// connect the database
mongoose.connect("mongodb://localhost/contact_list_db");

// acquire the connection(to check if db is connection successfull)
const db= mongoose.connection;

//error
db.on('error',console.error.bind(console,"error connecting to db"));

//up and ruuning the message
db.once('open',function(){
    console.log("successfully connected database");
})
