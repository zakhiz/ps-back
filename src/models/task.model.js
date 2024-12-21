import dbPs from '../config/database.config.js';
import { dBConfigVariables } from '../utils/constants.util.js'

const { tablet_task } = dBConfigVariables.tableName;


const createTask = async (taskData) => {
  try {
    const [newTask] = await dbPs(tablet_task).insert(taskData).returning('*');
    return newTask;
  } catch (error) {
    console.error("Error al crear la tarea:", error);
    throw new Error("Error al crear la tarea");
  }
};

const getAllTasks = async () => {
  try {
    return await dbPs(tablet_task).select('*');
  } catch (error) {
    console.error("Error al obtener las tareas:", error);
    throw new Error("Error al obtener las tareas");
  }
};

const getTaskByTitle = async (title) => {
  try {
    return await dbPs(tablet_task).where({ title }).first();
  } catch (error) {
    console.error(`Error al obtener la tarea con title ${title}:`, error);
    throw new Error(`Error al obtener la tarea con title ${title}`);
  }
};


const getTaskById = async (id) => {
  try {
    return await dbPs(tablet_task).where({ id }).first();
  } catch (error) {
    console.error(`Error al obtener la tarea con ID ${id}:`, error);
    throw new Error(`Error al obtener la tarea con ID ${id}`);
  }
};

const updateTask = async (id, taskData) => {
  try {
    await dbPs(tablet_task).where({ id }).update(taskData);
    return await getTaskById(id); 
  } catch (error) {
    console.error(`Error al actualizar la tarea con ID ${id}:`, error);
    throw new Error(`Error al actualizar la tarea con ID ${id}`);
  }
};

// Eliminar una tarea
const deleteTask = async (id) => {
  try {
    await dbPs(tablet_task).where({ id }).del();
    return { message: 'Tarea eliminada' };
  } catch (error) {
    console.error(`Error al eliminar la tarea con ID ${id}:`, error);
    throw new Error(`Error al eliminar la tarea con ID ${id}`);
  }
};

export { createTask, getAllTasks, getTaskById, updateTask, deleteTask, getTaskByTitle };