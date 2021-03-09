import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import formerRoutes from './routes/formers.js';
import themeRoutes from './routes/themes.js';
import participantRoutes from './routes/participants.js'
import sessionRoutes from './routes/sessions.js'
import authRoutes from './routes/userAuth.js';
import cookieParser from 'cookie-parser'


dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ['https://cims-certif.web.app', 'http://localhost:3000', 'http://localhost:8000', 'http://localhost:4200']  //3 react , 8 view, 42 angular
}));

app.use('/former', formerRoutes);
app.use('/theme', themeRoutes);
app.use('/participant', participantRoutes);
app.use('/session', sessionRoutes);
app.use('/auth', authRoutes);



const PORT = process.env.PORT || 5000;




mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`Starting server at http://localhost:${PORT}`);
    })
})
