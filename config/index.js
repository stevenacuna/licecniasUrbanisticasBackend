// let PORT = process.env.PORT || 8080;
// console.log("Inicializar la Aplicacion WEB...");
// let connectionString="mongodb://127.0.0.1:27017";
// let dbName="basesDatosLicencias";
// let collectionUser="usuarios";
// let fullUrl=connectionString+"/"+dbName;

let PORT = process.env.PORT || 8080;
console.log("Inicializar la Aplicacion WEB...");
let connectionString =
    "mongodb+srv://admin:admin123@cluster0.mz0e5va.mongodb.net/?retryWrites=true&w=majority";
let dbName = "basesDatosLicencias";
let collectionUser = "usuarios";
let fullUrl =
    "mongodb+srv://admin:admin123@cluster0.mz0e5va.mongodb.net/" +
    dbName +
    "?retryWrites=true&w=majority";
module.exports = {
    PORT,
    connectionString,
    dbName,
    collectionUser,
    fullUrl,
};
