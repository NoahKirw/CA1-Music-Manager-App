'use strict';

import express from "express";
import start from "./controllers/start.js";
import manager from "./controllers/manager.js";
import collection from "./controllers/collection.js";
import about from "./controllers/about.js";
import tracks from "./controllers/tracks.js";
import stats from "./controllers/stats.js";
import accounts from "./controllers/accounts.js";
import multer from "multer";

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.get('/start', start.createView);
router.get('/manager', manager.createView);
router.get('/albums', manager.createView);
router.get('/about', about.createView);
router.get('/album/:id', tracks.createView);
router.get('/album/:id/edittrack/:trackid', tracks.editView);
router.get('/albums', manager.createView);
router.get('/album/:id/deletesong/:trackid', tracks.deleteSong);
router.get('/manager/deletealbum/:id', manager.deletealbum);
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.get('/searchCategory', manager.createView);
router.get('/sortData', manager.createView);
router.get('/stats', stats.createView);





router.post('/album/:id/addsong', tracks.addSong);
router.post('/album/:id/updatetrack/:trackid', tracks.updateTrack);
router.post('/manager/addalbum', upload.single('image'), manager.addalbum);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);


router.get('/error', (request, response) => response.status(404).end('Page not found.'));

export default router;
