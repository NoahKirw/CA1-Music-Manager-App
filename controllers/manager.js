'use strict';

import logger from "../utils/logger.js";
import albumStore from "../models/album-store.js";
import { v4 as uuidv4 } from 'uuid';
import accounts from './accounts.js';



const manager = {
    createView(request, response) {
    logger.info("manager page loading!");

    const loggedInAccount = accounts.getCurrentaccount(request);

    if (loggedInAccount) {
      const searchTerm = request.query.searchTerm || "";

      const albums = searchTerm
        ? albumStore.searchUseralbums(searchTerm, loggedInAccount.id)
        : albumStore.getUseralbums(loggedInAccount.id);

      const sortField = request.query.sort;
      const order = request.query.order === "desc" ? -1 : 1;

      let sorted = albums;

      if (sortField) {
        sorted = albums.slice().sort((a, b) => {
          if (sortField === "title") {
            return a.title.localeCompare(b.title) * order;
          }

          if (sortField === "rating") {
            return (a.rating - b.rating) * order;
          }

          return 0;
        });
      }

      const viewData = {
        title: "album App manager",
        fullname: loggedInAccount.firstName + ' ' + loggedInAccount.lastName,
        albums: sortField ? sorted : albums,
        search: searchTerm,
        titleSelected: request.query.sort === "title",
        ratingSelected: request.query.sort === "rating",
        ascSelected: request.query.order === "asc",
        descSelected: request.query.order === "desc",
      };
      
      logger.info('about to render' + viewData.albums);
      
      response.render('manager', viewData);
    }
    else response.redirect('/');

  },


  async addalbum(request, response) {
    const loggedInAccount = accounts.getCurrentaccount(request);
    if (loggedInAccount) {
      const timestamp = new Date();
      
      const newalbum = {
        userid: loggedInAccount.id,
        id: uuidv4(),
        title: request.body.title,
        date: timestamp,
        tracks: [],
        image: request.file ? '/images/' + request.file.filename : null
      };
      await albumStore.addalbum(newalbum);
      response.redirect('/manager');
    } else {
      response.redirect('/');
    }
  },


  deletealbum(request, response) {
    const loggedInAccount = accounts.getCurrentaccount(request);
    if (loggedInAccount) {
      const albumId = request.params.id;
      logger.debug(`Deleting album ${albumId}`);
      albumStore.removealbum(albumId);
      response.redirect("/manager");
    } else {
      response.redirect('/');
    }
  },


};

export default manager;
