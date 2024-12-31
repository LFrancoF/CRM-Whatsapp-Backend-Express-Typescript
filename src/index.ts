import './dotenvConfig';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import 'dotenv/config';
import './database';

import routes from './routes/index';

const app = express();
app.use(morgan('dev'));
app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL
    })
);

app.use(express.json()); //para usar las req.body como un json
app.use(cookieParser());

const PORT = process.env.PORT || 3001;

app.get('/ping', (_req, res) => {
    console.log('someone pinged here right now');
    res.send('pong');
});

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
