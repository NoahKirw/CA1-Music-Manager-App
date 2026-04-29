'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const albumStore = {

  store: new JsonStore('./models/album-store.json', { albumStore: [] }),
  collection: 'albumStore',
  array: 'tracks',

  getAllalbums() {
    return this.store.findAll(this.collection);
  },

  getalbum(id) {
    return this.store.findOneBy(this.collection, (album => album.id === id));
  },

  gettrack(id) {
    const albums = this.getAllalbums() || [];
    for (const album of albums) {
      const track = (album.tracks || []).find((track) => track.id === id);
      if (track) {
        return track;
      }
    }
    return null;
  },
  
  async addtrack(id, track) {
    await this.store.addItem(this.collection, id, this.array, track);
  },

  async updatetrack(id, trackId, track) {
    await this.store.editItem(this.collection, id, trackId, this.array, track);
  },

  async removetrack(id, trackId) {
    await this.store.removeItem(this.collection, id, this.array, trackId);
  },

  async addalbum(album) {
    await this.store.addCollection(this.collection, album);
  },


  deletetrack(request, response) {
      const albumId = request.params.id;
      const trackId = request.params.trackid;
      logger.debug(`Deleting track  $(trackId} from album ${albumId}`);
      albumStore.removetrack(albumId, trackId);
      response.redirect('/album/' + albumId);
  },

  removealbum(id) {
    const album = this.getalbum(id);
    this.store.removeCollection(this.collection, album);
  },

  getUseralbums(userid) {
    return this.store.findBy(this.collection, (album => album.userid === userid));
  },

  searchUseralbums(search, userid) {
    return this.store.findBy(
      this.collection,
      (album => album.userid === userid && album.title.toLowerCase().includes(search.toLowerCase())))
  }, 

  searchalbum(search) {
    return this.store.findBy(
      this.collection,
      (album => album.title.toLowerCase().includes(search.toLowerCase())))
  }


};

export default albumStore;
