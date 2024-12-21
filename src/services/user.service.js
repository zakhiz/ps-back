import { createUser, getUserByEmail } from "../models/user.model.js";
import { createHash, validatePassword } from "../utils/encrypt.js";
import { Configstatus } from '../utils/constants.util.js';
import jwt from 'jsonwebtoken';
import configurationVariables from "../config/variables.config.js";

const {confict, bad_request, ok} = Configstatus;
const numberHash = 10;


const registerUser = async (dataUser) => {
        const {fullName, email, password} = dataUser;
        
        const userModel = [fullName, trimEmail(email), password];
    
        if (userModel.some(usr => !usr)) {
            
            const errorStatusIncomplete = {
                status : bad_request,
                error_description: "Campos imcompletos",
                error: 'Error register incomplete fields'
            };
            throw errorStatusIncomplete;
        }

        const exist = await getUserByEmail(trimEmail(email));
        if (!exist) {
            
            const hashedPassword = await createHash({password, countHast : numberHash});
            const newModelUser = {
                fullName,
                email: emailTrim,
                password: hashedPassword
            };
            
            const newUser = await createUser(newModelUser);
            
            const userWithoutPassword = {...newUser};
            delete userWithoutPassword.password;
            return userWithoutPassword;

        }else{
            const errorStatusExist = {
                status : confict_status,
                error_description: "El email ingresado ya esta registrado, porfavor intentar ingrese uno diferente",
                error: 'Error register'
            };

            throw errorStatusExist; 
        }
   }


const loginUser = async (dataUser) => {
        const {email, password} = dataUser;
        const userModel = [trimEmail(email), password];

        if (userModel.some(usr => !usr)) {
            const errorStatusIncomplete = {
                status : bad_request,
                error_description: "Campos imcompletos",
                error: 'Error login incomplete fields'
            };
            throw errorStatusIncomplete
        }
        
        const exist = await getUserByEmail(trimEmail(email));
        
        if(!exist){
            const errorStatusExist = {
                status : confict,
                error_description: "El email ingresado no se encuentra registrado",
                error: 'Error login'
            };

            throw errorStatusExist; 
        }

        const invalidPassword = await validatePassword(exist, password);
        

        const payload = {
            id: exist.id,
            fullName: exist.fullName,
        }
        const token = jwt.sign(payload,configurationVariables.JWT_SECRET,{expiresIn: configurationVariables.EXPIRATION_TIME});
        const payloadUser = {
            dataUser: payload,
            token
        }

        if (invalidPassword) {
            const logincorrect = {
                data : payloadUser,
                status: ok,
                error_description: 'login success',
                error: null
            }

            return logincorrect
           
        }else{
            const errorStatusInvalid = {
                status : confict,
                error_description: "La contraseña ingresada no es correcta, porfavor intentelo nuevamente",
                error: 'Error login'
            };
            throw errorStatusInvalid; 
        }


}


const trimEmail = (email) => {
    return email.trim();
} 

export {registerUser, loginUser}