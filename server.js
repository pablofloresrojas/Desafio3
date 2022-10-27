// importar express
const express = require("express");
// importar clase de desafio anterior
const contenedor = require("./Desafio2/contenedor");

// crear servidor con express
const app = express();

// levantar servidor
app.listen(8080,()=>console.log("Servidor corriendo en puerto 8080"));

const manejador = new contenedor("Desafio2/productos.txt");

// rutas 
// ruta para
app.get("/productos",async (req,res)=>{
    const data = await manejador.getAll();
    res.send(data);
});

app.get("/productoRandom",async (req,res)=>{
    const numeroAleatorio = parseInt(Math.random()*3+1);
    const data = await manejador.getById(numeroAleatorio);
    res.send(data);
});