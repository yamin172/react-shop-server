const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
require('dotenv').config();

const port = process.env.PORT || 5055;

app.use(cors());
app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.send("Hello World!?");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.psabv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log('Connection err', err);
    const productCollection = client.db("cycleshop").collection("product");
    
    app.post('/addProduct', (req, res) => {
        const newProduct = req.body;
        console.log('adding new product: ', newProduct)
        productCollection.insertOne(newProduct)
        .then(result => {
            console.log('inserted count:', result.insertedCount)
            res.send(result.insertedCount > 0 )
        })
    })
    app.get('/product', (req, res) => {
        productCollection.find()
            .toArray((err, items) => {
                console.log("🚀 ~ file: index.js ~ line 37 ~ .toArray ~ items", items)
                res.send(items)
            
        })
    })


  // perform actions on the collection object
    // client.close();
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
