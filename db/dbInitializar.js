let mongoose=require("mongoose")
let appConfig=require("../config")

let connetionPromise=mongoose.connect(appConfig.fullUrl);

connetionPromise
.then((result) => {
    
    console.log("Connecting successfullu");
    console.log(result);
})
.catch((err) => {
    console.log(err);
    console.log("Error connecting with DB");
});

