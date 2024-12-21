import configurationVariables from '../config/variables.config.js';
import { getUserByEmail } from '../models/user.model.js';
import { Configstatus } from '../utils/constants.util.js';
import jwt from 'jsonwebtoken';

const {bad_request,error_server} = Configstatus



const userQueryMiddleware = async (req, res, next) => {
    try {
        let token = req.headers['cookie']
        
        if (token) {
            const tokenValue = token.split('=')[1];

            const decoded = jwt.verify(tokenValue, configurationVariables.JWT_SECRET);
            const user = await getUserByEmail(decoded.email);
    
            if (user.email === decoded.email) {
                next(); 
            }
        }else{
            res.status(bad_request).send({status:bad_request, error_description: 'no posee una cookie', error: 'Error without cookie'});
        }

       
    } catch (error) {
        res.status(error).send({status:error_server, error_description: 'ocurrio un error al obtener la coockie', error: error.message});
    }
}

export {userQueryMiddleware}