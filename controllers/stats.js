"use strict";
import logger from "../utils/logger.js";
import albumStore from "../models/album-store.js";
import accountStore from "../models/account-store.js";
import accounts from './accounts.js';


const stats = {
    createView(request, response) {
    const loggedInaccount = accounts.getCurrentaccount(request);

    if (loggedInaccount) {
      logger.info("Stats page loading!");

      const albums = albumStore.getAllalbums() || [];

      let numalbums = albums.length;

      let numtracks = albums.reduce((total, album) => total + (album.tracks ? album.tracks.length : 0), 0);

      let average = numalbums > 0 ? (numtracks / numalbums).toFixed(2) : 0;

      let totalRating = albums.reduce((total, album) => total + (album.rating ? parseInt(album.rating) : 0), 0);

      let avgRating = numalbums > 0 ? totalRating / numalbums : 0;

      let maxRating = albums.length > 0 ? Math.max(...albums.map(album => album.rating)) : 0;
      let maxRated = albums.filter(album => album.rating === maxRating);
      let favTitles = maxRated.map(item => item.title);

      let longestSize = albums.length > 0 ? Math.max(...albums.map(album => album.tracks.length)) : 0;
      let longestalbums = albums.filter(album => album.tracks.length === longestSize);
      let longestalbumTitles = longestalbums.map(item => item.title);
      
      const accounts = accountStore.getAllaccounts();
      let numaccounts = accounts.length;

      const statistics = {
        displayNumAlbums: numalbums,
        displayNumTracks: numtracks,
        displayNumAccounts: numaccounts,
        displayAverage: average,
        displayAvgRating: avgRating.toFixed(2),
        highest: maxRating,
        displayFav: favTitles,
        longest: longestSize,
        longestTitles: longestalbumTitles,
      };

      const viewData = {
        title: "album App Statistics",
        stats: statistics,
        fullname: loggedInaccount.firstName + ' ' + loggedInaccount.lastName
      };

      response.render("stats", viewData);
    }
    else response.redirect('/');
  },

};

export default stats;
