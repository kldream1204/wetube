import express from 'express';
import routes from '../routes';
import { videoDetail, deleteVideo, getUpload, postUpload, getEditVideo, PostEditVideo } from '../controllers/videoController';
import { uploadVideo } from '../middlewares';

const videoRouter = express.Router();

videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

videoRouter.get(routes.deleteVideo(), deleteVideo);

videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), PostEditVideo);

videoRouter.get(routes.videoDetail(), videoDetail);

export default videoRouter;