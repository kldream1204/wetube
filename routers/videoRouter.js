import express from 'express';
import routes from '../routes';
import { videoDetail, deleteVideo, getUpload, postUpload, getEditVideo, PostEditVideo } from '../controllers/videoController';
import { uploadVideo, onlyPrivate } from '../middlewares';

const videoRouter = express.Router();

videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, PostEditVideo);

videoRouter.get(routes.videoDetail(), videoDetail);

export default videoRouter;