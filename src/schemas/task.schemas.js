import dbPs from "../config/database.config.js";
import {taskInterface, dBConfigVariables} from "../utils/constants.util.js";

const createTaskTable = async () => {
    
    const {table_users, tablet_task} = dBConfigVariables.tableName;
    const {id, title, description, user_id, status, dueDate} = taskInterface;

    const exist = await dbPs.schema.hasTable(tablet_task);
    
    if (!exist) {
        await dbPs.schema.createTable(tablet_task, (table) => {
            table.increments(id).primary();
            table.string(title, 100).notNullable();
            table.string(description, 255).notNullable();
            table.string(user_id, 255).unsigned().notNullable().references(id).inTable(table_users);
            table.string(status, 30).notNullable()
            table.date(dueDate).notNullable();
        })
    }else{
        console.log('error al crear task: ' + exist);
        return
    }
};

export default createTaskTable