import { createTask, deleteTask, getTaskById, getTaskByTitle, getTasksByUserId, updateTask } from '../models/task.model.js';
import { Configstatus } from '../utils/constants.util.js';

const {ok, error_server, bad_request,confict_status, notContentInDb} = Configstatus;

const createTaskService = async (taskData) => {
    
    const {title, description, user_id, status, due_Date} = taskData;
    
    const taskModel = [title, description, user_id, status, due_Date];

    if (taskModel.some(tsk => !tsk)) {
        
        const errorStatusIncomplete = {
            status : bad_request,
            error_description: "Campos imcompletos",
            error: 'Error task incomplete fields'
        };
        throw errorStatusIncomplete;
    }

    const exist = await getTaskByTitle(title);
    
    if (!exist) {
        const taskModel = {
            title,
            description,
            user_id,
            status,
            due_Date
        };
        
        const newTask = await createTask(taskModel);
        
        
        return newTask;
       
    }else{
        
        const errorStatusExist = {
            status : confict_status,
            error_description: "La tarea ya esta registrada",
            error: 'Error create task'
        };
        
        throw errorStatusExist;  
    }
}

const getAllTaskByUser = async (uid) => {
    
    if (!uid) {
        
        const errorStatusNotId = {
            status : bad_request,
            error_description: "El id enviado no existe",
            error: 'Error task incomplete id'
        };
        throw errorStatusNotId;
    }
    if (uid === "null" || uid === null) {
        const errorStatusIdNull = {
            status : bad_request,
            error_description: "El id del usuario es null",
            error: 'Error task incomplete id'
        };
        throw errorStatusIdNull;
    }

        const tasks = await getTasksByUserId(uid);
        
            if (!tasks || tasks.length === 0) {
                const errorStatusNotId = {
                    status : notContentInDb,
                    error_description: "No se encontro ninguna tarea con id del usuario",
                    error: 'Error taskid empty'
                };
                throw errorStatusNotId; 
            }else{
                return tasks
            }
}


const updateTaskService = async (tkId, taskData) => {
    
    const {title, description, user_id, status, due_date} = taskData;
    
    const taskModel = [title, description, user_id, status, due_date];
    
    if (taskModel.some(tsk => !tsk)) {
        
        const errorStatusIncomplete = {
            status : bad_request,
            error_description: "Campos imcompletos",
            error: 'Error task incomplete fields'
        };
        throw errorStatusIncomplete;
    }

    if (!tkId) {
        const errorStatusNotId = {
            status : bad_request,
            error_description: "El id enviado no existe",
            error: 'Error task incomplete id'
        };
        throw errorStatusNotId;
    }

    if (tkId === "null" || tkId === null) {
        const errorStatusIdNull = {
            status : bad_request,
            error_description: "El id de la tarea es null",
            error: 'Error task incomplete id'
        };
        throw errorStatusIdNull;
    }
    
    const exist = await getTaskById(tkId)
    if (!exist) {
        const dataChange = {
            title: title || exist.title,
            description: description || exist.description,
            user_id: user_id.toString() || exist.user_id,
            status: status || exist.status,
            due_date: due_date || exist.due_date,
        };
          
        const updateTks = await updateTask(tkId,dataChange);
        
        return updateTks;
       
       
    }else{
        const errorStatusExist = {
            status : confict_status,
            error_description: "No se encontro la tarea que desea actualizar",
            error: 'Error create task'
        };
        
        throw errorStatusExist;  
    }
}

const deleteTaskService = async (tkId) => {
    
    if (!tkId.id) {
        
        const errorStatusNotId = {
            status : bad_request,
            error_description: "El id enviado no existe",
            error: 'Error task incomplete id'
        };
        throw errorStatusNotId;
    }
    if (tkId.id === "null" || tkId.id === null) {
        const errorStatusIdNull = {
            status : bad_request,
            error_description: "El id del usuario es null",
            error: 'Error task incomplete id'
        };
        throw errorStatusIdNull;
    }
    const exist = await getTaskById(tkId.id);
    
    if (exist) {
         const delTask = deleteTask(tkId.id);

        return delTask;
    }else{
        
        const errorStatusExist = {
            status : confict_status,
            error_description: "La tarea que desea eliminar no existe",
            error: 'Error delete task'
        };
        
        throw errorStatusExist;  
    }

}

export {createTaskService, getAllTaskByUser ,updateTaskService , deleteTaskService}