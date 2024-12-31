import * as yup from 'yup';
import { Request, Response } from 'express';

import ListContacts from '../services/ContactService/listContacts';
import CreateContact from '../services/ContactService/createContact';
import ShowContact from '../services/ContactService/showContact';
import UpdateContact from '../services/ContactService/updateContact';
import DeleteContact from '../services/ContactService/deleteContact';

type IndexQuery = {
    searchParam: string;
    pageNumber: string;
};

interface ExtraInfo {
    name: string;
    value: string;
}
interface ContactData {
    name: string;
    number: string;
    email?: string;
    extraInfo?: ExtraInfo[];
}

export const index = async (req: Request, res: Response) => {
    const { searchParam, pageNumber } = req.query as IndexQuery;
    const { contacts, count, hasMore } = await ListContacts({
        searchParam,
        pageNumber
    });

    res.status(200).json({
        contacts,
        count,
        hasMore,
        mensaje: 'Peticion correcta'
    });
};

export const createContact = async (req: Request, res: Response) => {
    const newContact: ContactData = req.body;
    newContact.number = newContact.number.replace('-', '').replace(' ', '');

    const schema = yup.object().shape({
        name: yup.string().required(),
        number: yup
            .string()
            .required()
            .matches(/^\d+$/, 'Invalid number format. Only numbers is allowed.')
    });

    try {
        await schema.validate(newContact);
    } catch (err) {
        throw new Error(err.message);
    }

    /*VALIDAR NUMERO DE WHATSAPP CON LA SESION DEL USUARIO, Y OBTENER VALIDACION DEL SERVICIO WSPWEB.
    await CheckIsValidContact(newContact.number);
    const validNumber = await CheckContactNumber(newContact.number);

    const profilePicUrl = await GetProfilePicUrl(validNumber);*/

    const name = newContact.name;
    const number = newContact.number;
    const email = newContact.email;
    const extraInfo = newContact.extraInfo;

    const contact = await CreateContact({
        name,
        number,
        email,
        extraInfo,
        profilePicUrl: 'profile.png'
    });

    res.status(200).json(contact);
};

export const showContact = async (req: Request, res: Response) => {
    const { id } = req.params;

    const contact = await ShowContact(id);

    res.status(200).json(contact);
};

export const updateContact = async (req: Request, res: Response) => {
    const contactData: ContactData = req.body;

    const schema = yup.object().shape({
        name: yup.string(),
        number: yup
            .string()
            .matches(/^\d+$/, 'Invalid number format. Only numbers is allowed.')
    });

    try {
        await schema.validate(contactData);
    } catch (err) {
        throw new Error(err.message);
    }

    //await CheckIsValidContact(contactData.number);

    const { contactId } = req.params;

    const contact = await UpdateContact({ contactData, contactId });

    /*const io = getIO();
    io.emit('contact', {
        action: 'update',
        contact
    });*/

    res.status(200).json(contact);
};

export const deleteContact = async (req: Request, res: Response) => {
    const { id } = req.params;

    await DeleteContact(id);

    res.status(200).json({ message: 'Contacto eliminado' });
};
