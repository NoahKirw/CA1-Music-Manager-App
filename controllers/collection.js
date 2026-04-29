'use strict'; //Catchs common JavaScript mistakes

//Imports for printing messages to the console/log
import logger from "../utils/logger.js";

//"                                              "
import appStore from "../models/album-store.js";

//Defines object 'collection' that contains controller methods for collection-related routes
const collection = {
  
  //Method to handle the view for a specific collection
  createView(request, response) {
    //Get the collection ID from the request parameters (URL), e.g., /collection/:id
    const collectionId = request.params.id;
    
    //Logs the collection ID for debugging if neededd
    logger.info("Collection id = " + collectionId);

    //Prepares the data to send to the view template
    const viewData = {
      title: "Collection Details", // Title of the page
      collection: appStore.getCollection(collectionId) // Fetch the collection data from the appStore using the ID
    };

    //Renders the 'collection' view (collection.ejs or similar) and pass in the viewData
    response.render("collection", viewData);
  }
};

//Exports the 'collection' object so it can be used in other parts of the application (like routing)
export default collection;