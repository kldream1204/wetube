import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import morgan from 'morgan';
import helmet from 'helmet';
import routes from './routes'
import globalRouter from './routers/globalRouter'; 
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import { localsMiddlewares } from './middlewares';
import './passport';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import mongoStore from 'connect-mongo';
dotenv.config();

const app = express()

const cookieStore = mongoStore(session);


app.use(helmet());
app.set('view engine', 'pug')
app.use("/uploads", express.static('uploads'));
app.use("/static", express.static('static'));
app.use(cookieParser());  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(session({
    secret:  process.env.COOKIE_USER,
    store: new cookieStore({ mongooseConnection : mongoose.connection }),
    resave: true,
 	saveUninitialized: false 
}))
app.use(passport.initialize());
app.use(passport.session());    


app.use(localsMiddlewares);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;