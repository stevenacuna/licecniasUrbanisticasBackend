let PORT = process.env.PORT || 8081;

console.log("Inicializar la Aplicacion WEB...");

let connectionString="mongodb://127.0.0.1:27017";

let dbName="basesDatosLicencias";
let collectionUser="usuarios";

module.exports={
    PORT,
    connectionString,
    dbName,
    collectionUser

}


