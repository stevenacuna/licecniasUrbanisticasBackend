console.log("Cargando configuracion...");
//Importar las dependencias
const express = require("express");
var bodyParser=require("body-parser");
let cors = require("cors");
let session = require("express-session");

const {createRoles}=require("./lib/initialSetup")

//Cargar configuracion app WEB



//Inicializar una APLICACION WEB y conexion
//let dbConnector=require("./db/dbConnector");
require("./db/dbInitializar")
const app = express();
createRoles();

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


//levantar el servidor
console.log("Iniciando Servidor");

app.listen(appConfig.PORT,(req,res)=>{
    console.log("la aplicacion esta escuchando en la el puerto: "+ appConfig.PORT)
})
//middleware
app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret: 'mipalabrasecreta',
    cookie: { maxAge:60000, secure: false }
  }))

// app.use((req,res,next)=>{
//     if(req.session.MI_VAR>-1){
//         req.session.MI_VAR=req.session+1;
//     }else{
//         req.session=0
//     }
//     console.log(req.session);
//     next();
// });

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



const authRoutes=require("./routes/authRoutes");

app.use("/api/auth",authRoutes)