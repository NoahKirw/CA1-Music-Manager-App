'use strict';
import logger from '../utils/logger.js';
import appStore from '../models/album-store.js';
import appInfo from '../models/app-info.js';
import accounts from './accounts.js';

const about = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentaccount(request);
    logger.info('About page loading!');
    
    if (loggedInUser) {
      const viewData = {
        title: 'About the Album App',
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        info: appInfo.getAppInfo(appStore.getAllalbums()),
      };
      response.render('about', viewData);
    }
    else response.redirect('/');
  },
};

export default about;
