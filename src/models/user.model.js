import dbPs from '../config/database.config.js';
import { dBConfigVariables } from '../utils/constants.util.js'

const { table_users } = dBConfigVariables.tableName;

const createUser = async (userData) => { 
    try {
        const [newUserId] = await dbPs(table_users).insert(userData);
           const newUser = await dbPs(table_users).where({ id: newUserId }).first();
        return newUser

    } catch (error) {
        console.error('error al generar un usuario', error);
        throw new Error('Error create User');
    }
}

const getUserByEmail = async (email) => {
  try {
    const user = await dbPs(table_users).where({ email }).first();
    return user 
  } catch (error) {
    console.error('Error al buscar el usuario por email:', error.message);
    throw error;
  }
};

const getAllUsers = async () => {
    try {
      return await dbPs(table_users).select('*');
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      throw new Error("Error al obtener los usuarios");
    }
  };
  
  const getUserById = async (id) => {
    try {
      return await dbPs(table_users).where({ id }).first();
    } catch (error) {
      console.error(`Error al obtener el usuario con ID ${id}:`, error);
      throw new Error(`Error al obtener el usuario con ID ${id}`);
    }
  };
  
  const updateUser = async (id, userData) => {
    try {
      await dbPs(table_users).where({ id }).update(userData);
      return await getUserById(id); 
    } catch (error) {
      console.error(`Error al actualizar el usuario con ID ${id}:`, error);
      throw new Error(`Error al actualizar el usuario con ID ${id}`);
    }
  };
  
  const deleteUser = async (id) => {
    try {
      await dbPs(table_users).where({ id }).del();
      return { message: 'Usuario eliminado' };
    } catch (error) {
      console.error(`Error al eliminar el usuario con ID ${id}:`, error);
      throw new Error(`Error al eliminar el usuario con ID ${id}`);
    }
  };

  export {createUser, getAllUsers, getUserById, updateUser , deleteUser, getUserByEmail};