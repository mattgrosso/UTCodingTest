(function() {
  'use strict';

  angular
    .module('phone')
    .controller('PhonebookController', PhonebookController);

  PhonebookController.$inject = ['phonebookFactory'];

  function PhonebookController(phonebookFactory) {

    this.contactsList = phonebookFactory.contactsList;

    this.newContact = {
      firstName: null,
      lastName: null,
      phone: null
    };

    this.addContact = function addContact(contact) {
      phonebookFactory.contactsList.push(contact);
      console.log(phonebookFactory.contactsList);
    };
  }

})();
