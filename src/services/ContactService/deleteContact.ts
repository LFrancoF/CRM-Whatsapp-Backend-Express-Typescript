import Contact from '../../models/Contact';

const DeleteContact = async (id: string): Promise<void> => {
    const contact = await Contact.findOne({
        where: { id }
    });

    if (!contact) {
        throw new Error('ERR_NO_CONTACT_FOUND');
    }

    await contact.destroy();
};

export default DeleteContact;
