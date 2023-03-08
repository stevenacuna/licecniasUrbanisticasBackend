let appConfig = require("../../config");
let dbConnector = require("../dbConnector");

async function createUser(user) {
    try {
        let db=dbConnector.db(appConfig.dbName);
        let collection=db.collection(appConfig.collectionUser);
        let resutl=await collection.insertOne(user);

        return result;

    } catch (ex) {
        console.log(ex);
        return [];
    }
}

async function getAllUser() {
    try {
        let db=dbConnector.db(appConfig.dbName);
        let collection=db.collection(appConfig.collectionUser);
        let result=[];
        let cursor=collection.find({});
        let currentUser=await cursor.next();
        while(currentUser!=null){
            result.push(currentUser);
            currentUser=await cursor.next();
        }
        
        return result;
    } catch (ex) {
        console.log(ex);
        return [];
    }
}

module.exports = {
    createUser,
    getAllUser,
};
