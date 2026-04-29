'use strict';

import logger from '../utils/logger.js';
import accountStore from '../models/account-store.js';
import { v4 as uuidv4 } from 'uuid';

const accounts = {

  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },
  
  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },
  
  logout(request, response) {
    response.clearCookie('album');
    response.redirect('/');
  },
  
  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },
  
  register(request, response) {
    const account = request.body;
    account.id = uuidv4();
    accountStore.addaccount(account);
    logger.info('registering' + account.email);
    response.cookie('album', account.email, { httpOnly: true });
      logger.info('logging in' + account.email);
      response.redirect('/start');
  },
  
  authenticate(request, response) {
    const account = accountStore.getaccountByEmail(request.body.email);
    if (account && account.password === request.body.password) {
      response.cookie('album', account.email, { httpOnly: true });
      logger.info('logging in' + account.email);
      response.redirect('/start');
    } else {
      response.redirect('/login');
    }
  },
  
  getCurrentaccount (request) {
    const accountEmail = request.cookies.album;
    return accountStore.getaccountByEmail(accountEmail);
  }
}

export default accounts;
