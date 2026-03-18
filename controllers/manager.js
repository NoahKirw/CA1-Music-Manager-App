'use strict'; //Catches common JavaScript mistakes

//Imports for printing messages to the console/log
import appStore from "../models/manager-store.js";

//Controller object for handling the manager page
const manager = {

  //Function that creates and renders the manager view
  createView(request, response) {

    //Data that will be sent to the manager template
    const viewData = {
      title: "album manager",
      albums: appStore.getAllAlbums() // Get all albums from the app store
    };

    //Renders the manager Handlebars template and pass the data to it
    response.render("manager", viewData);
  }
};

//Export the manager controller so it can be used in the router
export default manager;