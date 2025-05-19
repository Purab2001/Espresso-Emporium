const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@espresso-emporium.bv8u4zp.mongodb.net/?retryWrites=true&w=majority&appName=Espresso-Emporium`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
        const coffeeCollection = client.db("espressoDB").collection("coffee");
        const userCollection = client.db("espressoDB").collection("users");

        app.get('/coffees', async (req, res) => {
            const cursor = coffeeCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });
        app.get('/coffees/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const coffee = await coffeeCollection.findOne(query);
            res.send(coffee);
        });
        app.post('/coffees', async (req, res) => {
            const newCoffee = req.body;
            const result = await coffeeCollection.insertOne(newCoffee);
            res.send(result);
        });
        app.put('/coffees/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updatedCoffee = req.body;
            const options = { upsert: true };
            const updateDoc = {
                $set: updatedCoffee,
            };
            const result = await coffeeCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        });
        app.delete('/coffees/:id', async (req, res) => {
            const id = req.params.id;
            let objectId;
            try {
                objectId = new ObjectId(id);
            } catch (err) {
                return res.status(400).json({ error: 'Invalid coffee id' });
            }
            const query = { _id: objectId };
            const result = await coffeeCollection.deleteOne(query);
            res.send(result);
        });

        app.get('/users', async (req, res) => {
            const cursor = userCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });
        app.post('/users', async (req, res) => {
            const userProfile = req.body;
            const result = await userCollection.insertOne(userProfile);
            res.send(result);
        });
        app.patch('/users', async (req, res) => {
            const {email, lastSignInTime, name, photo} = req.body;
            const filter = { email: email };
            const updateDoc = {
                $set: {}
            };
            if (lastSignInTime) updateDoc.$set.lastSignInTime = lastSignInTime;
            if (name) updateDoc.$set.name = name;
            if (photo) updateDoc.$set.photo = photo;
            const result = await userCollection.updateOne(filter, updateDoc);
            res.send(result);
        });
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.send(result);
        });

        console.log("Pinged your deployment. You successfully connected to MongoDB!");
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;