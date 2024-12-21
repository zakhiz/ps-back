import { createTaskService } from "../services/task.service.js";
import { Configstatus } from '../utils/constants.util.js';

const {ok, error_server} = Configstatus;

const createNewTaskController = async (req, res) => {
  try {
    const taskData = req.body; 
    
    const newTask = await createTaskService(taskData); 

    return res.status(ok).send({status: ok, message: 'Tarea creada exitosamente', task: newTask });
    
  } catch (error) {

        return res.status(error.status || error_server).send({
        status: error.status || error_server,
        error_description: error.error_description || 'Error desconocido',
        error: error.error || error.message
        });
  }
};

const getAllUserTasksController = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const tasks = await getAllUserTasks(userId);
    return res.status(ok).send({
      message: "Tareas obtenidas exitosamente",
      tasks
    });
  } catch (error) {
    return res.status(error.status || error_server).send({
      status: error.status || error_server,
      error_description: error.error_description || 'Error desconocido',
      error: error.error || error.message
    });
  }
};

const getTaskDetailsController = async (req, res) => {
  try {
    const taskId = req.params.taskId; 
    const task = await getTaskDetails(taskId); 
    return res.status(ok).send({
      message: "Tarea obtenida exitosamente",
      task
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
    const taskId = req.params.taskId; 
    const taskData = req.body; 
    const updatedTask = await updateTaskDetails(taskId, taskData);  
    return res.status(ok).send({
      message: "Tarea actualizada exitosamente",
      task: updatedTask
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
    const taskId = req.params.taskId; 
    const result = await deleteTaskById(taskId); 
    return res.status(ok).send(result);
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
  getAllUserTasksController,
  getTaskDetailsController,
  updateTaskDetailsController,
  deleteTaskByIdController
};
