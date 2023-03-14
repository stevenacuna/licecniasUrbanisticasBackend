
const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema(
    {
        
        name: { type: String  }
        
    },
    {
       
        versionKey: false,
    }
);

const roleModel = new mongoose.model("role", roleSchema);

module.exports={
    roleModel,
    roleSchema
}