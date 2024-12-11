import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { dbConfig } from './config';

import Queue from '../models/Queue';

const sequelize = new Sequelize(dbConfig as SequelizeOptions);

const models = [Queue];

sequelize.addModels(models);

export default sequelize;
