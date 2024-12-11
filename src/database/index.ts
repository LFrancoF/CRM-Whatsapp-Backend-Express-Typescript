import { Sequelize } from 'sequelize-typescript';

import Queue from '../models/Queue';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const dbConfig = require('../config/configDB');

const sequelize = new Sequelize(dbConfig);

const models = [Queue];

sequelize.addModels(models);

export default sequelize;
