import { createTask, getTaskByTitle } from '../models/task.model.js';
import { Configstatus } from '../utils/constants.util.js';

const {ok, error_server, bad_request,confict_status} = Configstatus;

const createTaskService = async (taskData) => {
    const {title, description, user_id, status} = taskData;

    const taskModel = [title, description, user_id, status];

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
            status
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

const updateTaskService = () => {
    
}

const deleteTaskService = () => {

}

export {createTaskService }