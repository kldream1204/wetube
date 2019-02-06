import routes from './routes'
import multer from 'multer';

const multerVideo =multer({ dest: 'uploads/videos/'});
const multerAvatar = multer({ dest: 'uploads/avatars'});

export const localsMiddlewares = (req, res, next) => {
    res.locals.siteName = 'WeTube';
    res.locals.routes = routes; 
    res.locals.loginUser = req.user || null ;
    next();
};

export const uploadVideo = multerVideo.single('uploadVideo');
export const uploadAvatar = multerAvatar.single('photo');

export const onlyPublic = (req, res, next) => {
    if (req.user) {
        res.redirect(routes.home);
    }else {
        next();
    }
};

export const onlyPrivate = (req, res, next) => {
    if (req.user) {
        next();
    }else {
        res.redirect(routes.home);
    }
};
