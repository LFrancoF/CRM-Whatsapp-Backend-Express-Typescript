export default {
    secret: process.env.JWT_SECRET || 'mysecretToken',
    expiresIn: '15m',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'myanothersecretToken',
    refreshExpiresIn: '7d'
};
