import routes from '../routes';
import Video from '../models/Video';

export const home = async (req, res) => {
    try{
    const videos = await Video.find({}).sort({_id:-1});
    res.render('home', {videos});
    } catch(error) {
        console.log(error);
        res.render('home', {videos:[]});
    }
}
export const search = async (req, res) => {
    const {query: {term:searchingBy} } = req;
    let videos =[];
    try {
        videos = await Video.find({title:{ $regex : searchingBy, $options: 'i'}})
    }catch (error) {
        console.log(error)
    }
    res.render('search', {searchingBy, videos} );
}
export const getUpload = (req, res) => {
    res.render('upload');
}
export const postUpload = async (req, res) => {
    const {body:{title, description}} = req;
    const {file:{path}} = req;
    const {file} =req;
    console.log(file);
    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description
    })
    console.log(newVideo);
    res.redirect(routes.videoDetail(newVideo.id));
}
export const videoDetail = async (req, res) => {

    const {
        params: {id}
    } =req;
    try {
        const video = await Video.findById(id);
    res.render('videoDetail', {video});
    }catch(error) {
        console.log(error);
        res.redirect(routes.home);

    }
}

export const getEditVideo = async (req, res) => {

    const {params:{id}} = req;
    try{
        const video = await Video.findById(id)
        res.render('editVideo', {video});
    }catch(error) {
        console.log(error);
        res.redirect(routes.home);
    }

    
}
export const PostEditVideo = async (req, res) => {
    const {
        params:{id},
        body:{title, description}
    } =req;
    try {
        await Video.findOneAndUpdate({_id:id},{title, description});
        res.redirect(routes.videoDetail(id));
    }catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }
    
}


export const deleteVideo = async (req, res) =>{
    const {
        params:{id}
    } = req;
    try {
        await Video.findOneAndRemove({_id:id});
    }catch (error) {
        console.log(error);
    }
    res.redirect(routes.home);
};

