'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/album-store.js";
import accountStore from "../models/account-store.js";
import appInfo from "../models/app-info.js";
import accounts from './accounts.js';


const start = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentaccount(request);
    logger.info("Start page loading!");
    
    if (loggedInUser) {
      const albums = appStore.getAllalbums() || [];
      const numAlbums = albums.length;
      const numTracks = albums.reduce((total, album) => total + (album.tracks ? album.tracks.length : 0), 0);
      const averageTracks = numAlbums > 0 ? (numTracks / numAlbums).toFixed(2) : 0;
      const totalRating = albums.reduce((total, album) => total + (album.rating ? parseInt(album.rating) : 0), 0);
      const averageRating = numAlbums > 0 ? (totalRating / numAlbums).toFixed(2) : 0;
      const maxRating = albums.length > 0 ? Math.max(...albums.map(album => album.rating || 0)) : 0;
      const favoriteAlbums = albums.filter(album => album.rating === maxRating).map(album => album.title);
      const longestSize = albums.length > 0 ? Math.max(...albums.map(album => album.tracks ? album.tracks.length : 0)) : 0;
      const longestAlbums = albums.filter(album => (album.tracks ? album.tracks.length : 0) === longestSize).map(album => album.title);
      const userAccounts = accountStore.getAllaccounts() || [];

      const viewData = {
        title: "Welcome to the Playlist app!",
        info: appInfo.getAppInfo(albums),
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        stats: {
          displayNumAlbums: numAlbums,
          displayNumTracks: numTracks,
          displayNumAccounts: userAccounts.length,
          displayAverage: averageTracks,
          displayAvgRating: averageRating,
          highest: maxRating,
          displayFav: favoriteAlbums,
          longest: longestSize,
          longestTitles: longestAlbums,
        }
      };
      response.render('start', viewData);
    }
    else response.redirect('/');    
},

};

export default start;
