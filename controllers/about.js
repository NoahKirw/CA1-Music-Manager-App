'use strict'; //Catchs common JavaScript mistakes

//Imports for printing messages to the console/log
import appStore from "../models/manager-store.js";

//Defines the 'about' controller object with methods for handling about page routes
const about = {
  
  //Method to create and render the "About" page
  createView(request, response) {
    
    //Prepares the data to send to the view template
    const viewData = {
      title: "About", // Page title
      info: appStore.getAppInfo() // Retrieve application info (e.g., description, version, author) from appStore
    };

    //Renders the 'about' view template (about.ejs or similar) and pass the viewData object
    response.render("about", viewData);
  }
};

// Exports the 'about' controller so it can be used in routing modules
export default about;