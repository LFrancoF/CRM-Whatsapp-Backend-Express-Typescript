import Queue from '../../models/Queue';

const ListQueues = async (): Promise<Queue[]> => {
    const queues = await Queue.findAll({ order: [['name', 'ASC']] });
    return queues;
};

export default ListQueues;
