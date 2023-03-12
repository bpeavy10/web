const express = require("express")
const app = express();
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const path = require("path")

app.use(express.static(__dirname + '/public'));
// app.use('/css',express.static(path.join(__dirname, 'index.css')));

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://bpeavy10:Mybaby01@743spt.hf6zblb.mongodb.net/newsletterDB")//, { useNewUrlPasrser: true }, { useUnifiedTopology: true})

// //const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://bpeavy10:Mybaby01@743spt.hf6zblb.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

//create a data schema
const newsSchema = {
    f_name: String,
    l_name: String,
    email: String
}

const News = mongoose.model("News", newsSchema);


 app.get("/", function(req, res) {
    res.sendFile(__dirname + "/home.html");
})

 app.get('/index.css', (request, responseC) => {
    responseC.sendFile(path.join(__dirname, "/index.css"))
});

app.post("/", function(req, res) {
    let newNews = new News({
        f_name: req.body.f_name,
        l_name: req.body.l_name,
        email: req.body.email
    });
    newNews.save();
    res.redirect('/');

})

app.listen(3000, function() {
    console.log("server is running on 3000");
})