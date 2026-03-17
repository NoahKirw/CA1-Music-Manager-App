'use strict'; //Strict mode that...

//Imports for printing messages to the console/log
import appStore from "../models/app-store.js";

//Controller object for handling tracks pages
const tracks = {

  //Function that creates and renders a tracks view
  createView(request, response) {

    //Gets the tracks ID from the URL parameters
    const tracksId = parseInt(request.params.id);

    //Data that will be passed to the tracks template
    const viewData = {
      title: "tracks",                          
      album: appStore.getAlbum(tracksId)  //Gets the tracks from the store using its ID
    };

    //Renders the "tracks" template and send the data to it
    response.render("tracks", viewData);
  }
};

//Exports the tracks controller so it can be used in the routing
export default tracks;