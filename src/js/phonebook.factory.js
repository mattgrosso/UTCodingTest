(function() {
  'use strict';

  angular
    .module('phone')
    .factory('phonebookFactory', phonebookFactory);


  var contactsList = [];

  function phonebookFactory() {
    return {
      contactsList: contactsList,
      addContact: addContact
    };
  }

  function addContact(contact) {
    var duplicate = false;
    contactsList.forEach(function checkForDuplicates(each) {
      if (each.phone === contact.phone) {
        duplicate = true;
      }
    });

    if (!duplicate) {
      contact.ID = Math.floor(Math.random()*1000000); // TODO: This is not a secure ID at all. Just a useful workaround for now. 
      contactsList.push(contact);
    }
  }

})();
