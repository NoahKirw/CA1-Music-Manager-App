'use strict'; //Ccatchs common JavaScript mistakes

//Imports for printing messages to the console/log
import playlistStore from "../models/app-store.js";

//Controller object for handling the manager page
const manager = {

  //Function that creates and renders the manager view
  createView(request, response) {

    //Data that will be sent to the manager template
    const viewData = {
      title: "Playlist manager",                
      albums: playlistStore.getAllAlbums()        //Get all playlists from the app store
    };

    //Renders the manager Handlebars template and pass the data to it
    response.render("manager", viewData);
  }
};

//Export the manager controller so it can be used in the router
export default manager;