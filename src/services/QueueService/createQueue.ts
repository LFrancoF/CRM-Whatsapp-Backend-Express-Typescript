import * as yup from 'yup';
import Queue from '../../models/Queue';

const CreateQueue = async (queueData: {
    name: string;
    color: string;
    greetingMessage: string;
}): Promise<Queue> => {
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
                            where: { name: value }
                        });

                        return !queueWithSameName;
                    }
                    return false;
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
                return false;
            })
            .test(
                'Check-color-exists',
                'ERR_QUEUE_COLOR_ALREADY_EXISTS',
                async (value) => {
                    if (value) {
                        const queueWithSameColor = await Queue.findOne({
                            where: { color: value }
                        });
                        return !queueWithSameColor;
                    }
                    return false;
                }
            )
    });

    try {
        await queueSchema.validate({ color, name });
    } catch (err) {
        throw new Error(err);
    }

    const queue = await Queue.create(queueData);

    return queue;
};

export default CreateQueue;
