import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import routes from './routes'
import globalRouter from './routers/globalRouter'; 
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import { localsMiddlewares } from './middlewares';

const app = express()

app.use(helmet());
app.set('view engine', 'pug')
app.use(cookieParser());  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(localsMiddlewares);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;