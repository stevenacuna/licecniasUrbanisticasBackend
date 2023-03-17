const role = require("../db/schemas/roles");

const createRoles = async () => {
    try {
        const countRoles = await role.roleModel.estimatedDocumentCount();

        if (countRoles > 0) return;

        const valuesRoles = await Promise.all([
            new role.roleModel({ name: "user" }).save(),
            new role.roleModel({ name: "admin" }).save(),
            new role.roleModel({ name: "reviewer1" }).save(),
            new role.roleModel({ name: "reviewer2" }).save(),
            new role.roleModel({ name: "reviewer3" }).save(),
        ]);
        console.log({valuesRoles});
    } catch (err) {
        console.log(err);
    }
};

module.exports={
    createRoles
};
