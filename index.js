const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const url = "mongodb://localhost:27017";
const dbName = "Projeto_BackEnd";

async function main() {
    console.log("Conectando ao banco de dados...");

    const client = await MongoClient.connect(url);

    const db = client.db(dbName);

    const collection = db.collection("foods");

    console.log("Conexão realizada com sucesso!");

    const app = express();

    app.use(express.json());

    const port = 3000;

    const foods = ["Banana", "Brigadeiro", "Pizza", "Laranja"];

    app.get('/', function (req, res) {
        res.send('Rota Principal');
    });

    app.get('/listFoods', function (req, res) {
        res.send(foods.filter(Boolean));
    });

    app.get('/listFoods/:id', function (req, res) {
        const id = req.params.id - 1;

        const item = foods[id];

        res.send(item);
    });

    app.post('/listFoods', function (req, res) {
        const item = req.body.nome;

        foods.push(item);

        res.send(`Item adicionado na lista!\nItem: ${item}`);
    });

    app.put('/listFoods/:id', function (req, res) {
        const id = req.params.id - 1;

        const newItem = req.body.nome;

        foods[id] = newItem;

        res.send(`Item atualizado na lista!\nItem: ${newItem}`);
    });

    app.delete('/listFoods/:id', function (req, res) {
        const id = req.params.id - 1;

        delete foods[id];

        res.send("Item deletado da lista!");
    });

    app.listen(port, function () {
        console.info(`App rodando em http://localhost:${port}`);
    });

};

main();