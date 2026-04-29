'use strict'; //Strict mode that...

//Imports for printing messages to the console/log
import logger from '../utils/logger.js';
import appStore from '../models/album-store.js';
import { v4 as uuidv4 } from 'uuid';
import accounts from './accounts.js';

//Controller object for handling tracks pages
const tracks = {
  createView(request, response) {
    const tracksId = request.params.id;
    const loggedInUser = accounts.getCurrentaccount(request);
    
    if (loggedInUser) {
      logger.debug('tracks id = ' + tracksId);
      const album = appStore.getalbum(tracksId);
      const viewData = {
        title: 'tracks',
        album,
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      };

      response.render('tracks', viewData);
    } else {
      response.redirect('/');
    }
  },

  editView(request, response) {
    const albumId = request.params.id;
    const trackId = request.params.trackid;
    const loggedInUser = accounts.getCurrentaccount(request);

    if (loggedInUser) {
      const album = appStore.getalbum(albumId);
      const track = album && album.tracks ? album.tracks.find((t) => t.id === trackId) : null;
      if (!album || !track) {
        return response.redirect('/album/' + albumId);
      }

      const viewData = {
        title: 'Edit track',
        album,
        track,
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      };

      response.render('track-edit', viewData);
    } else {
      response.redirect('/');
    }
  },

  async updateTrack(request, response) {
    const loggedInUser = accounts.getCurrentaccount(request);
    if (loggedInUser) {
      const albumId = request.params.id;
      const trackId = request.params.trackid;
      const updatedTrack = {
        id: trackId,
        name: request.body.name,
        artist: request.body.artist,
        duration: request.body.duration,
      };
      await appStore.updatetrack(albumId, trackId, updatedTrack);
      response.redirect('/album/' + albumId);
    } else {
      response.redirect('/');
    }
  },

  //Function to delete a song from an album
  deleteSong(request, response) {
    const loggedInUser = accounts.getCurrentaccount(request);
    if (loggedInUser) {
      const albumId = request.params.id;
      const trackId = request.params.trackid;
      appStore.removetrack(albumId, trackId);
      response.redirect('/album/' + albumId);
    } else {
      response.redirect('/');
    }
  },

  //Function to add a song to an album
  async addSong(request, response) {
    const loggedInUser = accounts.getCurrentaccount(request);
    if (loggedInUser) {
      const albumId = request.params.id;
      const track = {
        id: uuidv4(),
        ...request.body
      };
      await appStore.addtrack(albumId, track);
      response.redirect('/album/' + albumId);
    } else {
      response.redirect('/');
    }
  }
};

//Exports the tracks controller so it can be used in the routing
export default tracks;
