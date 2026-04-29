'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const accountStore = {

  store: new JsonStore('./models/account-store.json', { accounts: [] }),
  collection: 'accounts',

  getAllaccounts() {
    return this.store.findAll(this.collection);
  },
  
  getaccountById(id) {
    return this.store.findOneBy(this.collection, (account => account.id === id));
  },
  
  getaccountByEmail(email) {
    return this.store.findOneBy(this.collection, (account => account.email === email));
  },
  
  addaccount(account) {
    this.store.addCollection(this.collection, account);
  },

};

export default accountStore;
