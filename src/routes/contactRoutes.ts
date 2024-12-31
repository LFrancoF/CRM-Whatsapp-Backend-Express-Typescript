import { Router } from 'express';
import * as ContactController from '../controllers/ContactController';

const contactRoutes = Router();

contactRoutes.get('/contacts', ContactController.index);

contactRoutes.post('/contacts', ContactController.createContact);

contactRoutes.get('/contacts/:id', ContactController.showContact);

contactRoutes.put('/contacts/:contactId', ContactController.updateContact);

contactRoutes.delete('/contacts/:id', ContactController.deleteContact);

export default contactRoutes;
