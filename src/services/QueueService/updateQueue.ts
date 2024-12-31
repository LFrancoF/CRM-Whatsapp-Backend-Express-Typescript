import { Op } from 'sequelize';
import * as yup from 'yup';
import Queue from '../../models/Queue';
import ShowQueue from './showQueue';

interface QueueData {
    name?: string;
    color?: string;
    greetingMessage?: string;
}

const UpdateQueue = async (
    queueId: number | string,
    queueData: QueueData
): Promise<Queue> => {
    const { color, name } = queueData;

    const queueSchema = yup.object().shape({
        name: yup
            .string()
            .min(2, 'ERR_QUEUE_INVALID_NAME')
            .test(
                'Check-unique-name',
                'ERR_QUEUE_NAME_ALREADY_EXISTS',
                async (value) => {
                    if (value) {
                        const queueWithSameName = await Queue.findOne({
                            where: { name: value, id: { [Op.not]: queueId } }
                        });

                        return !queueWithSameName;
                    }
                    return true;
                }
            ),
        color: yup
            .string()
            .required('ERR_QUEUE_INVALID_COLOR')
            .test('Check-color', 'ERR_QUEUE_INVALID_COLOR', async (value) => {
                if (value) {
                    const colorTestRegex = /^#[0-9a-f]{3,6}$/i;
                    return colorTestRegex.test(value);
                }
                return true;
            })
            .test(
                'Check-color-exists',
                'ERR_QUEUE_COLOR_ALREADY_EXISTS',
                async (value) => {
                    if (value) {
                        const queueWithSameColor = await Queue.findOne({
                            where: { color: value, id: { [Op.not]: queueId } }
                        });
                        return !queueWithSameColor;
                    }
                    return true;
                }
            )
    });

    try {
        await queueSchema.validate({ color, name });
    } catch (err) {
        throw new Error(err);
    }

    const queue = await ShowQueue(queueId);

    await queue.update(queueData);

    return queue;
};

export default UpdateQueue;
