const express = require('express')
require('dotenv').config();
const cors = require('cors');
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const app = express()
const port = process.env.PORT || 8000
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.eg4ok.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log('error', err)
    const productCollection = client.db("tree-station").collection("products");
    const checkOutCollection = client.db("tree-station").collection("checkouts");
    console.log('DB Connected');

    app.get('/products', (req, res) => {
        productCollection.find()
            .toArray((err, items) => {
                res.send(items)
                // console.log(items)
            })
    })

    app.get('/orders', (req, res) => {
        // console.log(req.query.email);
        checkOutCollection.find({ email: req.query.email })
            .toArray((err, items) => {
                res.send(items)
                // console.log(items)
            })
    })

    app.get('/products/:id', (req, res) => {
        const id = ObjectID(req.params.id);
        productCollection.findOne({ _id: id })
            .then(documents => res.send(documents))
    })

    app.post('/addProduct', (req, res) => {
        const newEvent = req.body;
        console.log('adding new event: ', newEvent)
        productCollection.insertOne(newEvent)
            .then(result => {
                console.log('inserted count', result.insertedCount);
                res.send(result.insertedCount > 0)
            })

    })

    app.post('/addCheckOut', (req, res) => {
        const newEvent = req.body;
        console.log('adding new event: ', newEvent)
        checkOutCollection.insertOne(newEvent)
            .then(result => {
                console.log('inserted count', result.insertedCount);
                res.send(result.insertedCount > 0)
            })

    })

    app.delete('/deleteProduct/:id', (req, res) => {
        const id = ObjectID(req.params.id);
        console.log('delete this', id);
        productCollection.findOneAndDelete({ _id: id })
            .then(documents => res.send(!!documents.value))
    })
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})