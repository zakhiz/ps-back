import express from 'express';
import configurationVariables from './config/variables.config.js';
import createTaskTable from './schemas/task.schemas.js';
import createUserTable from './schemas/user.schemas.js';
import userRoute from './routes/user.route.js';
import taskRoute from './routes/task.route.js';
const app = express();

app.use(express.json());

createTaskTable();
createUserTable();

app.use('/api', userRoute, taskRoute)

app.listen((configurationVariables.PORT), () => {
        console.log('listening ' + configurationVariables.PORT);
});
