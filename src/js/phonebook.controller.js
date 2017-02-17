(function() {
  'use strict';

  angular
    .module('phone')
    .controller('PhonebookController', PhonebookController);

  PhonebookController.$inject = ['phonebookFactory'];

  function PhonebookController(phonebookFactory) {

    this.message = "";
    this.contactsList = phonebookFactory.contactsList;
    this.sortColumn = 'lastName';
    this.sortReverse = false;
    this.tableFilter = "";

    this.newContact = {};

    this.addContact = function addContact(contact) {
      var listLength = this.contactsList.length;
      phonebookFactory.addContact(contact);
      this.newContact = {};
      if (listLength === this.contactsList.length) {
        this.showMessage("That contact is already included.");
      }
    };

    this.editContact = function editContact(event, contact, contentType) {
      contact[contentType] = event.target.innerText;
    };

    this.deleteContact = function deleteContact(contact) {
      this.contactsList.splice(this.contactsList.findIndex(function findMatchingContact(element) {
        return element === contact;
      }),1);
      this.showMessage("Contact removed.");
    };

    this.starContact = function starContact(contact) {
      if (contact.star) {
        contact.star = 0;
      } else {
        contact.star = 1;
      }
    };

    this.showMessage = function showMessage(message) {
      this.message = message;
    };

    this.resetForm = function resetForm(form) {
      form.$setPristine(true);
    };

  }

})();
