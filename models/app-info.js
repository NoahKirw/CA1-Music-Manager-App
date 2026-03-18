'use strict';

import appInfoData from "./app-info.json" with { type: "json" };

const getAppInfo = (allAlbums) => {
  const albums = allAlbums || [];
  return {
    ...appInfoData,
    Albums: albums.length,
    tracks: albums.reduce((total, album) => total + album.tracks.length, 0)
  };
};

export default { getAppInfo };