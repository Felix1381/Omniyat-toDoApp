const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { taskRoutes } = require('./modules/tasks');
const errorHandler = require('./errorHandler'); // L'emplacement réel de ton error handler
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use('/tasks', taskRoutes); // Utilise les routes des tâches
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});