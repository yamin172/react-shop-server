const express = require("express");
const app = express();
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
require('dotenv').config()

const port = process.env.PORT || 5050;

app.use(cors());
app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.send("Hello World!");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.psabv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
client.connect((err) => {
    console.log('connection err', err);
    const productCollection = client.db("cycleshop").collection("product");

    app.post('/addProduct', (req, res) => {
        const newProduct = req.body;
        console.log('adding new product: ', newProduct)
    })
    // client.close();
});




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
