const express = require('express');
const Contenedor = require('./Contenedor');

const app = express();

const product = new Contenedor('./productos.txt');



app.get('/productos', async (req, res) => {
    let allProducts = await product.getAll();
    res.send(allProducts);
});

app.get('/productoRandom', async (req, res) => {
    let rand = Math.floor(Math.random() * (3) +1);
    let productById = await product.getById(rand);
    res.send(productById);
});

const server = app.listen(8080, () => {
    console.log(`Servidor http escuchando al puerto ${server.address().port}`)
});

server.on('error', error => console.log(`Error en servidor ${error}`));