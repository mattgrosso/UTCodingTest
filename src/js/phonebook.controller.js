(function() {
  'use strict';

  angular
    .module('phone')
    .controller('PhonebookController', PhonebookController);

  PhonebookController.$inject = ['phonebookFactory'];

  function PhonebookController(phonebookFactory) {

    this.message = "";
    this.contactsList = phonebookFactory.contactsList;
    this.editingID = null;

    this.newContact = {};

    this.addContact = function addContact(contact) {
      var listLength = this.contactsList.length;
      phonebookFactory.addContact(contact);
      this.newContact = {};
      if (listLength === this.contactsList.length) {
        this.message = "That contact is already included.";
      } else {
        this.message = "";
      }
    };

    this.editContact = function editContact(event, contact, contentType) {
      contact[contentType] = event.target.innerText;
      console.log(contact);
    };

  }

})();
