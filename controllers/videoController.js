import routes from '../routes';
import Video from '../models/Video';

export const home = async (req, res) => {
    try{
    const videos = await Video.find({});
    res.render('home', {videos});
    } catch(error) {
        console.log(error);
        res.render('home', {videos:[]});
    }
}
export const search = (req, res) => {
    const {query: {term:searchingBy} } = req;
    res.render('search', {searchingBy, videos} );
}
export const getUpload = (req, res) => {
    res.render('upload');
}
export const postUpload = async (req, res) => {
    const {body:{title, description}} = req;
    const {file:{path}} = req;
    
    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description
    })
    console.log(newVideo);
    res.redirect(routes.videoDetail(newVideo.id));
}
export const videoDetail = (req, res) => {
    res.render('videoDetail');
}

export const editVideo = (req, res) => res.render('editVideo');
export const deleteVideo = (req, res) => res.render('deleteVideo');

