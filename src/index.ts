import express from 'express';
import 'dotenv/config';

import routes from './routes/index';

const app = express();

app.use(express.json()); //middleware que transforma la req.body a un json

const PORT = process.env.PORT || 3001;

app.get('/ping', (_req, res) => {
    console.log('someone pinged here right now');
    res.send('pong');
});

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
