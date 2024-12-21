import dotenv from 'dotenv';

dotenv.config();

const parseBoolean = (value) => value === "true";

const configurationVariables = {
    PORT :  process.env.PORT,
    DB: process.env.PATH_DB ,
    CLIENT_DB: process.env.CLIENT_DB,
    JWT_SECRET: process.env.JWT_SECRET,
    EXPIRATION_TIME:process.env.JWT_EXPIRATION,
    JWT_COOKIE:{
        HTTPONLY: parseBoolean(process.env.HTTPONLY) ,
        SAMESITE: process.env.SAMESITE,
        SECURE: parseBoolean(process.env.SECURE)
    }
}

export default configurationVariables