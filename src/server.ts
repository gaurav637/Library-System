import dotenv from 'dotenv';
import app from './app';
import connectDB from './config/db';
import logger from "./utils/logger";
import bodyParser = require('body-parser');

dotenv.config();
// app.use(bodyParser.json());
const PORT = process.env.PORT || 4040;
const start = async ()=> {
    connectDB();
    app.listen(PORT, () => {
        logger.info(`Server running on http://localhost:${PORT}`);
    });
}

start();
