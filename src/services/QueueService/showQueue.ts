import Queue from '../../models/Queue';

const ShowQueue = async (id: number | string): Promise<Queue> => {
    const queue = await Queue.findByPk(id);

    if (!queue) {
        throw new Error('ERR_QUEUE_NOT_FOUND');
    }
    return queue;
};

export default ShowQueue;
