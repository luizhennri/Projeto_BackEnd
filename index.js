const express = require('express');
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

    res.send("Item adicionado na lista!");
});

app.listen(port, function () {
    console.info(`App rodando em http://localhost:${port}`);
});