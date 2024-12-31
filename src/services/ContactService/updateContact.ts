import Contact from '../../models/Contact';
import ContactCustomField from '../../models/ContactCustomField';

interface ExtraInfo {
    id?: number;
    name: string;
    value: string;
}

interface ContactData {
    email?: string;
    number?: string;
    name?: string;
    extraInfo?: ExtraInfo[];
}

interface Request {
    contactData: ContactData;
    contactId: string;
}

const UpdateContact = async ({
    contactData,
    contactId
}: Request): Promise<Contact> => {
    const { email, name, number, extraInfo } = contactData;

    const contact = await Contact.findOne({
        where: { id: contactId },
        attributes: ['id', 'name', 'number', 'email', 'profilePicUrl'],
        include: ['extraInfo']
    });

    if (!contact) {
        throw new Error('ERR_NO_CONTACT_FOUND');
    }

    if (extraInfo) {
        await Promise.all(
            extraInfo.map(async (info) => {
                await ContactCustomField.upsert({
                    ...info,
                    contactId: contact.id
                });
            })
        );

        await Promise.all(
            contact.extraInfo.map(async (oldInfo) => {
                const stillExists = extraInfo.findIndex(
                    (info) => info.id === oldInfo.id
                );

                if (stillExists === -1) {
                    await ContactCustomField.destroy({
                        where: { id: oldInfo.id }
                    });
                }
            })
        );
    }

    await contact.update({
        name,
        number,
        email
    });

    await contact.reload({
        attributes: ['id', 'name', 'number', 'email', 'profilePicUrl'],
        include: ['extraInfo']
    });

    return contact;
};

export default UpdateContact;
