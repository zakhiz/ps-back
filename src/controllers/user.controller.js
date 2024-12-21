import configurationVariables from '../config/variables.config.js';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../models/user.model.js';
import { loginUser, registerUser } from '../services/user.service.js';
import { Configstatus } from '../utils/constants.util.js';

const {error_server, ok, not_found} = Configstatus

const registerUserController = async (req, res) => {
  try {
    const userData = req.body; 
    
    const newUser = await registerUser(userData);
    
    return res.status(ok).send({status: ok, message: 'Usuario registrado correctamente', user: newUser });

  } catch (error) {
    
    return res.status(error.status || error_server)
    .send({status: error.status || error_server, error_description: error.error_description || 'error desconocido',error: error.error || error.message});

  }
};

const loginUserController = async (req, res) => {
    try {
        const userData = req.body;
        const userLogin = await loginUser(userData);
        const {dataUser, token} = userLogin.data
        
        return res.cookie('jwt',token,{
          httpOnly: configurationVariables.JWT_COOKIE.HTTPONLY,
          sameSite: configurationVariables.JWT_COOKIE.SAMESITE,
          secure: configurationVariables.JWT_COOKIE.SECURE
        }).status(ok).send({status: ok, message: 'Usuario logeado correctamente', user: dataUser });

    } catch (error) {
      return res.status(error.status || error_server)
      .send(
        {
            status: error.status || error_server,
            error_description: error.error_description || 'error desconocido',
            error: error.error || error.message});
        }
}

const logoutUserController = (req, res) => {
  res.clearCookie('jwt').status(ok).send({status: ok, data: null, error_description:'Se cerro correctamente su sesión', error: null})
}

const getUserByIdController = async (req, res) => {
    const { id } = req.query;
    
    try {
      const user = await getUserById(id);
      
      const userResponse ={
        fullName: user.fullName,
        email: user.email
      }

      if (user) {
        return res.status(ok).json({status: ok ,data: userResponse, error_description: 'Usuario encontrado',error: null});
      } else {
        return res.status(not_found).json({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error(`Error en el controlador de obtener usuario con ID ${id}:`, error);
      return res.status(error_server).json({ error: error.message });
    }
};



const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    return res.status(ok).json(users);
  } catch (error) {
    console.error("Error en el controlador de obtener usuarios:", error);
    return res.status(error_server).json({ error: error.message });
  }
};


const updateUserController = async (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  try {
    const updatedUser = await updateUser(id, userData);
    return res.status(ok).json(updatedUser);
  } catch (error) {
    console.error(`Error en el controlador de actualizar usuario con ID ${id}:`, error);
    return res.status(error_server).json({ error: error.message });
  }
};

const deleteUserController = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteUser(id);
    return res.status(ok).json({ message: 'Usuario eliminado' });
  } catch (error) {
    console.error(`Error en el controlador de eliminar usuario con ID ${id}:`, error);
    return res.status(error_server).json({ error: error.message });
  }
};

export { 
  registerUserController, 
  getAllUsersController, 
  getUserByIdController, 
  updateUserController, 
  deleteUserController,
  loginUserController, 
  logoutUserController
};
