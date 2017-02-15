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
      contactsList.push(contact);
    }
  }

})();
