import {videos} from '../db';
import routes from '../routes';

export const home = (req, res) => {
    res.render('home', {videos});
}
export const search = (req, res) => {
    const {query: {term:searchingBy} } = req;
    res.render('search', {searchingBy, videos} );
}
export const getUpload = (req, res) => {
    res.render('upload');
}
export const postUpload = (req, res) => {
    res.redirect(routes.videoDetail(123));
}
export const videoDetail = (req, res) => {
    res.render('videoDetail', {videos});
}

export const editVideo = (req, res) => res.render('editVideo');
export const deleteVideo = (req, res) => res.render('deleteVideo');

