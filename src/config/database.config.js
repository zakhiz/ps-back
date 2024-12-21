import knex from "knex";
import { dBConfigVariables } from "../utils/constants.util.js";
import configurationVariables from "./variables.config.js";

const { useNullAsDefault } = dBConfigVariables;

const sqliteOptions = { 
    client: configurationVariables.CLIENT_DB,
    connection: {
        filename: configurationVariables.DB 
    },
    useNullAsDefault: useNullAsDefault
};

const dbPs = knex(sqliteOptions);

export default dbPs;
