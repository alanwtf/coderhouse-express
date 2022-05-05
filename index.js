const express = require("express");
const Contenedor = require("./Contenedor");

const app = express();
const container = new Contenedor("productos.txt");

const PORT = 8080;

app.get("/", (req, res) => {
    return res.send("Home");
});

app.get("/productos", async (req, res) => {
    const all = await container.getAll();
    return res.send({ all });
});

app.get("/productoRandom", async (req, res) => {
    const random = await container.getRandom();
    return res.send({ random });
});

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
