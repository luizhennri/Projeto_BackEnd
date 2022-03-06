const express = require('express');
const app = express();

const port = 3000;

const foods = ["Banana", "Brigadeiro", "Pizza", "Laranja"];

app.get('/', function (req, res) {
    res.send('Rota Principal');
});

app.get('/listFoods', function (req, res) {
    res.send(foods);
});

app.listen(port, function () {
    console.info(`App rodando em http://localhost:${port}`);
});