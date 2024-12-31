import User from '../../models/User';
import {
    createAccessToken,
    createRefreshToken
} from '../../helpers/CreateToken';
import { SerializeUser } from '../../helpers/SerializeUser';
import Queue from '../../models/Queue';

interface SerializedUser {
    id: number;
    name: string;
    email: string;
    profile: string;
    queues: Queue[];
}

interface Request {
    email: string;
    password: string;
}

interface Response {
    serializedUser: SerializedUser;
    token: string;
    refreshToken: string;
}

const AuthUserService = async ({
    email,
    password
}: Request): Promise<Response> => {
    const user = await User.findOne({
        where: { email },
        include: ['queues']
    });

    if (!user) {
        throw new Error('ERR_INVALID_CREDENTIALS');
    }

    if (!(await user.checkPassword(password))) {
        throw new Error('ERR_INVALID_CREDENTIALS');
    }

    const token = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    const serializedUser = SerializeUser(user);

    return {
        serializedUser,
        token,
        refreshToken
    };
};

export default AuthUserService;
