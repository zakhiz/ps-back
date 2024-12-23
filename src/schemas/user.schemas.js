import dbPs from "../config/database.config.js";
import {dBConfigVariables , userInterface} from "../utils/constants.util.js";

const createUserTable = async () => {
    
    const {table_users} = dBConfigVariables.tableName
    const {id, fullName, email, password} = userInterface;

    const exist = await dbPs.schema.hasTable(table_users);
    if (!exist) {
        await dbPs.schema.createTable(table_users, (table) => {
            table.increments(id).primary();
            table.string(fullName, 50).notNullable();
            table.string(email, 100).notNullable().unique();
            table.string(password, 255).notNullable();
        })
    }else{
        console.log('error al crear schema user solo lo muestra luego de haber creado la DB: ' + exist);
        return
    }
};

export default createUserTable