import User from '../../models/User';
import Queue from '../../models/Queue';
import Whatsapp from '../../models/Whatsapp';

const ShowUserService = async (id: string | number): Promise<User> => {
    const user = await User.findByPk(id, {
        attributes: [
            'name',
            'id',
            'email',
            'profile',
            'tokenVersion',
            'whatsappId'
        ],
        include: [
            { model: Queue, as: 'queues', attributes: ['id', 'name', 'color'] },
            { model: Whatsapp, as: 'whatsapp', attributes: ['id', 'name'] }
        ],
        order: [[{ model: Queue, as: 'queues' }, 'name', 'asc']]
    });
    if (!user) {
        throw new Error('ERR_NO_USER_FOUND');
    }

    return user;
};

export default ShowUserService;
