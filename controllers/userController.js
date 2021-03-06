import passport from 'passport';
import routes from '../routes';
import User from '../models/user';

export const getJoin = (req, res) =>{

    res.render('join' , {pageTitle: 'Join'});
    
    }
    
export const postJoin = async (req, res, next) => {
    
    const {body: {name, email, password, password2}} = req;
        if(password !== password2) {
            res.status(400);
            res.render('join' , {pageTitle: 'Join'});
        }else {
            try{
            const user = await User({
                name,
                email
            });
            await User.register(user, password);
            next();
            } catch (error) {
                console.log(error);
                res.redirect(routes.home)
            }
        }       
    }
    
export const getLogin = (req, res) =>  {


    res.render('login', {pageTitle: 'Login'});
        
}
        
        
export const postLogin = passport.authenticate("local", {
    failureRedirect: routes.login,
    successRedirect: routes.home
})
        
        
export const logout = (req, res) => {
    req.logout();
    res.redirect(routes.home);    
}

export const userDetail = async (req, res) => {
    
    const {params:{id}} = req;
    try {
        const user = await User.findById(id);
        res.render('userDetail' ,{user});
    }catch (error) {
        console.log(error);
        res.redirect(routes.home)
    }
}


export const getEditProfile = (req, res) => {
    res.render('editProfile');
}
export const postEditProfile = async (req, res) => {
    const {
        body:{ name, email},
        file
    } = req;
    try {
        await User.findByIdAndUpdate( req.user.id, {
            name,
            email,
            avatarUrl: file ? file.path : req.user.avatarUrl
        });
        res.redirect(`/users${routes.me}`);
    }catch (error) {
        res.redirect(routes.editProfile)
    }
}

export const getChangePassword = (req, res) => {
    res.render('changePassword');
   
}
export const postChangePassword = async (req, res) => {
    const {
        body: {oldPassword, newPassword, newPassword2}
    }  = req;
    try {
        if (newPassword !== newPassword2) {
            res.status(400);
            res.redirect(routes.changePassword);
            return
        }
        req.user.changePassword(oldPassword, newPassword);
        res.redirect(`/users${routes.me}`);
    } catch (error) {
        res.status(400);
        res.redirect(routes.changePassword);
    }
    
}

export const me = (req, res) => {
    console.log(req.user)
    res.render('userDetail', {user: req.user});
}