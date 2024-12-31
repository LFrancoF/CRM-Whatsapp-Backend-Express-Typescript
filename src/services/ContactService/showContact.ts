import Contact from '../../models/Contact';

const ShowContact = async (id: string | number): Promise<Contact> => {
    const contact = await Contact.findByPk(id, { include: ['extraInfo'] });

    if (!contact) {
        throw new Error('ERR_NO_CONTACT_FOUND');
    }

    return contact;
};

export default ShowContact;
