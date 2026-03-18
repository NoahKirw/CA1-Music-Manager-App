'use strict';

import logger from "../utils/logger.js";
import JsonStore from "./json-store.js";
import appInfo from "./app-info.js";

let nextId = 1;

const musicManager = {

  store: new JsonStore("./models/album-store.json", { albumStore: [] }),
  stores: "albumStore",
  array: "tracks",

  getAllAlbums() {
    return this.store.findAll(this.stores);
  },

  getAlbum(id) {
    const albumCode = Number(id);
    return this.store.findOneBy(this.stores, (Album) => Album.code === albumCode);
  },

  getAppInfo() {
    const allAlbums = this.getAllAlbums() || [];
    return appInfo.getAppInfo(allAlbums);
  }

};

export default musicManager;