import { Sequelize } from 'sequelize-typescript';

import Queue from '../models/Queue';
import Contact from '../models/Contact';
import ContactCustomField from '../models/ContactCustomField';
import User from '../models/User';
import UserQueue from '../models/UserQueue';
import Whatsapp from '../models/Whatsapp';
import WhatsappQueue from '../models/WhatsappQueue';
import Ticket from '../models/Ticket';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const dbConfig = require('../config/configDB');

const sequelize = new Sequelize(dbConfig);

const models = [
    Queue,
    Contact,
    ContactCustomField,
    User,
    UserQueue,
    Whatsapp,
    WhatsappQueue,
    Ticket
];

sequelize.addModels(models);

export default sequelize;
