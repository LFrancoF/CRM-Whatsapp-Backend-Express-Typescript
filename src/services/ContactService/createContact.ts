import Contact from '../../models/Contact';

interface ExtraInfo {
    name: string;
    value: string;
}

interface Request {
    name: string;
    number: string;
    email?: string;
    profilePicUrl?: string;
    extraInfo?: ExtraInfo[];
}

const CreateContact = async ({
    name,
    number,
    email = '',
    extraInfo = []
}: Request): Promise<Contact> => {
    const numberExists = await Contact.findOne({
        where: { number }
    });

    if (numberExists) {
        throw new Error('ERR_DUPLICATED_CONTACT');
    }

    const contact = await Contact.create(
        {
            name,
            number,
            email,
            extraInfo
        },
        {
            include: ['extraInfo']
        }
    );

    return contact;
};

export default CreateContact;
