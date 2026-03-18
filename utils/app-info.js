'use strict';

import logger from "./logger.js";

const getAppInfo = (allAlbums) => {
  const albums = allAlbums || [];
  return {
    author: "Noah Kirwan",
    email: "noah@blahblahblah.com",
    appName: "Music Manager",
    version: "1.0.0",
    Albums: albums.length,
    tracks: albums.reduce((total, p) => total + p.tracks.length, 0)
  };
};

export default { getAppInfo };
