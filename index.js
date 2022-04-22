require("dotenv").config();

const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbPort = process.env.DB_PORT;

const url = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.pnffj.mongodb.net`;

async function main() {
    console.log("Conectando ao banco de dados MongoDB...");

    const client = await MongoClient.connect(url);

    const db = client.db(dbName);

    const collection = db.collection("foods");

    console.log("Conexão realizada com sucesso!");

    const app = express();

    app.use(express.json());

    app.get('/', function (req, res) {
        res.send('Rota Principal');
    });

    app.get('/listFoods', async function (req, res) {
        const documentos = await collection.find().toArray();

        res.send(documentos);
    });

    app.get('/listFoods/:id', async function (req, res) {
        const id = req.params.id;

        const item = await collection.findOne({ _id: new ObjectId(id) });

        res.send(item);
    });

    app.post('/listFoods', async function (req, res) {
        const item = req.body;

        await collection.insertOne(item);

        res.send(`Item adicionado na lista!\nItem: ${item.nome}\nId: ${item._id}`);
    });

    app.put('/listFoods/:id', async function (req, res) {
        const id = req.params.id;

        const newItem = req.body;

        await collection.updateOne(
            { _id: ObjectId(id) },
            {
                $set: newItem
            }
        );

        res.send(`Item atualizado na lista!\nItem: ${newItem.nome}`);
    });

    app.delete('/listFoods/:id', async function (req, res) {
        const id = req.params.id;

        await collection.deleteOne({ _id: ObjectId(id) });

        res.send("Item deletado da lista!");
    });

    app.listen(process.env.PORT || dbPort, function () {
        console.info("Rodando aplicação...");
    });

};

main();
