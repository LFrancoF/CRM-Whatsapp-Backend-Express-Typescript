import ShowQueue from './showQueue';

const DeleteQueue = async (id: number | string): Promise<void> => {
    const queueFound = await ShowQueue(id);
    await queueFound.destroy();
};

export default DeleteQueue;
