import { createTaskService, deleteTaskService, getAllTaskByUser, updateTaskService } from "../services/task.service.js";
import { Configstatus } from '../utils/constants.util.js';

const {ok, error_server} = Configstatus;

const createNewTaskController = async (req, res) => {
  try {
    const taskData = req.body; 
    
    const newTask = await createTaskService(taskData); 
    
    return res.status(ok).send({status: ok, message: 'Tarea creada exitosamente', data: newTask });
    
  } catch (error) {

        return res.status(error.status || error_server).send({
        status: error.status || error_server,
        error_description: error.error_description || 'Error desconocido',
        error: error.error || error.message
        });
  }
};

const getTaskByUserController = async (req, res) => {
  try {
    const { id } = req.query;

    const tasksByUser = await getAllTaskByUser(id)

    return res.status(ok).send({
      status: ok,
      data: tasksByUser,
      message: "Tareas obtenidas exitosamente"
    });
  } catch (error) {
     
    return res.status(error.status || error_server).send({
      status: error.status || error_server,
      error_description: error.error_description || 'Error desconocido',
      error: error.error || error.message
    });
  }
};


const updateTaskDetailsController = async (req, res) => {
  try {
    const taskId = req.query; 
    const taskData = req.body;

    const updatedTask = await updateTaskService(taskId, taskData);  

    return res.status(ok).send({
      status:ok,
      data: updatedTask,
      message: "Tarea actualizada exitosamente",
    });
  } catch (error) {
    return res.status(error.status || error_server).send({
      status: error.status || error_server,
      error_description: error.error_description || 'Error desconocido',
      error: error.error || error.message
    });
  }
};

const deleteTaskByIdController = async (req, res) => {
  try {
    const taskId = req.query;
     

    const result = await deleteTaskService(taskId); 

    return res.status(ok).send({
      status: ok,
      data: null,
      message : "tarea eliminada correctamente"
    });

  } catch (error) {
    return res.status(error.status || error_server).send({
      status: error.status || error_server,
      error_description: error.error_description || 'Error desconocido',
      error: error.error || error.message
    });
  }
};

export {
  createNewTaskController,
  getTaskByUserController,
  updateTaskDetailsController,
  deleteTaskByIdController
};
