const dBConfigVariables = { 
    useNullAsDefault : true,
    tableName : {
        table_users : 'Users',
        tablet_task: 'Tasks'
    }
}

const userInterface  = {
    id: 'id',
    fullName: 'fullName',
    email: 'email',
    password: 'password'
}


const taskInterface  = {
    id: 'id',
    title: 'title',
    description: 'description',
    user_id: 'user_id',
    status: 'status'
}


const Configstatus = {
    error_server: 500,
    confict_status: 409,
    bad_request: 400,
    ok: 200,
    not_found: 404
}

export {dBConfigVariables , userInterface, taskInterface, Configstatus};