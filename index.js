console.log("Cargando configuracion...");
//Importar las dependencias
const express = require("express");
const bodyParser=require("body-parser");

//Cargar configuracion app WEB



//Inicializar una APLICACION WEB y conexion
let dbConnector=require("./db/dbConnector");
const app = express();

// 1) Metodo HTTP (verbos HTTP)
// 2) RUTA (VIrtual)
// 3) EL ALGORITMO QUE YO PROGRAMO PARA RESPONDER ESA PETICION

let appConfig=require("./config");


console.log("Configurando Routers...");

//Configuracion de ROUTERS
const userRouter=require("./routes/routerUser");
// const { createUser } = require("./db/getData");
//registramos enrutador

app.use("/"+appConfig.collectionUser,userRouter);

//levantamos el servidor 

app.listen(appConfig.PORT,(req,res)=>{
    console.log("la aplicacion esta escuchando en la el puerto: "+ appConfig.PORT)
})

app.use(bodyParser.json());
app.get("/",(req,res)=>{
    res.send("Bienvenido al Backend");
})

app.use(
    "/app",

    express.static("front")
);
app.use("/static", express.static("front/static"));

app.use("/api/usuarios",userRouter);


app.use("/static", express.static("front/static"));


//levantar el servidor
console.log("Iniciando Servidor");

