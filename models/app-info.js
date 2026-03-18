'use strict';

import logger from "../utils/logger.js";
import appInfoData from "./app-info.json" assert { type: "json" };

const getAppInfo = (allAlbums) => {
  const albums = allAlbums || [];
  return {
    ...appInfoData,
    Albums: albums.length,
    tracks: albums.reduce((total, p) => total + p.tracks.length, 0)
  };
};

export default { getAppInfo };