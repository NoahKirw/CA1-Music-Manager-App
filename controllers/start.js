'use strict'; //Strict mode to catch JavaScript mistakes

//Imports for printing messages to the console/log
import logger from "../utils/logger.js";

//Imports for printing messages to the console/log
import appStore from "../models/app-store.js";

//Controller object for the home page
const start = {

  //Function that runs when the home page is requested
  createView(request, response) {

    //Logs a message to show that the home page is loading
    logger.info("Home page loading!");
    
    //Data that will be passed to the Handlebars view
    const viewData = {

      //Title
      title: "Music App",

      //Get app info from the app store
      info: appStore.getAppInfo()
    };
    
    //Renders the start view and send the data to it
    response.render('start', viewData);   
  },
};

//Exports the start controller so it can be used in other files (like routes)
export default start;