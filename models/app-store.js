'use strict';

import logger from "../utils/logger.js";
import JsonStore from "./json-store.js";

let nextId = 1;

const musicManager = {

  store: new JsonStore("./models/app-store.json", { albumStore: [] }),
  stores: "albumStore",
  array: "songs",

  getAllAlbums() {
    return this.store.findAll(this.stores);
  },

  getAlbum(id) {
    return this.store.findOneBy(this.stores, (Album) => Album.id === id);
  },

  getAppInfo() {
    const allAlbums = this.getAllAlbums() || [];
    return {
      author: "Noah Kirwan",
      email: "noah@blahblahblah.com",
      appName: "Music Manager",
      version: "1.0.0",
      Albums: allAlbums.length,
      songs: allAlbums.reduce((total, p) => total + p.songs.length, 0)
    };
  } 

};

export default musicManager;