import app from './app';
import './db';
import dotenv from 'dotenv'
dotenv.config();
import './models/Video';
import './models/Comment';
import './models/user';

const PORT = process.env.PORT || 5000;

const handleListening = () => console.log(`Listening on: http://localhast:${PORT}`)

app.listen(PORT, handleListening);