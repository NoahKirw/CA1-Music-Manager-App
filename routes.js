'use strict';

import express from "express";
import start from "./controllers/start.js";
import manager from "./controllers/manager.js";
import collection from "./controllers/collection.js";
import about from "./controllers/about.js";
import tracks from "./controllers/tracks.js";


const router = express.Router();

router.get("/", start.createView);
router.get("/manager", manager.createView);
router.get("/collection/:id", collection.createView);
router.get("/about", about.createView);

router.get("/tracks/:id", tracks.createView);

export default router;