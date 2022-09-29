// rutas del programa
const express = require("express");
const fs = require("fs");
const rutador = express.Router();
//------------------------------------------------
// ruta get

rutador.get("/", (req, res) => {
    var encontradas = fs.readFileSync("src/ubicada.json", "utf-8");
    var encontradas_json = JSON.parse(encontradas);

    res.send(encontradas_json);
});

rutador.get("/servidor", (req, res) => {
    var estado_servidor = fs.readFileSync("src/errores.json", "utf-8");
    var estado_servidor_json = JSON.parse(estado_servidor);

    res.send(estado_servidor_json);
});

rutador.get("/contador", (req, res) => {
    var estado_contador = fs.readFileSync("src/contador.json", "utf-8");
    var estado_contador_json = JSON.parse(estado_contador);

    res.send(estado_contador_json);
});

//------------------------------------------------
module.exports = rutador;
