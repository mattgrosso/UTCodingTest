(function() {
  'use strict';

  angular
    .module('phone')
    .controller('PhonebookController', PhonebookController);

  PhonebookController.$inject = ['phonebookFactory'];

  function PhonebookController(phonebookFactory) {

    this.message = "";
    this.contactsList = phonebookFactory.contactsList;

    this.newContact = {
      firstName: null,
      lastName: null,
      phone: null
    };

    this.addContact = function addContact(contact) {
      var listLength = this.contactsList.length;
      phonebookFactory.addContact(contact);
      if (listLength === this.contactsList.length) {
        this.message = "That contact is already included.";
      }
    };
  }

})();
