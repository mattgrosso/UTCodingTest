(function() {
  'use strict';

  angular
    .module('phone')
    .controller('PhonebookController', PhonebookController);

  PhonebookController.$inject = ['phonebookFactory', '$scope', '$timeout'];

  function PhonebookController(phonebookFactory, $scope, $timeout) {
    var that = this;
    this.message = "";
    this.contactsList = phonebookFactory.getContactsList();
    this.sortColumn = 'firstName';
    this.sortReverse = true;
    this.tableFilter = "";
    this.collapsed = true;
    this.newContact = {};

    /**
     * This function takes in an object which represents a contact. It will usually
     * include a first name, a last name and a phone number.
     * That object is passed to phonebookFactory.addContact(), resets this.newContact,
     * and then confirms that the contactsList has increased in length. If the
     * array has not grown it notifies the user that the contact was already present.
     * @param {Object} contact Contact object.
     */
    this.addContact = function addContact(contact) {
      var listLength = this.contactsList.length;
      phonebookFactory.addContact(contact);
      this.newContact = {};
      if (listLength === this.contactsList.length) {
        this.showMessage("That contact is already included.");
      }
    };

    /**
     * This function is triggered when one of the fields in the phonebook table
     * is edited using contenteditable.
     * It uses the event to find the new text for the key and applies it to the
     * appropriate key on the correct object.
     * @param  {Event Object} event       Contenteditable event object
     * @param  {Object} contact           Contact object
     * @param  {String} contentType       String representing the key that was modified.
     */
    this.editContact = function editContact(event, contact, contentType) {
      contact[contentType] = event.target.innerText;
    };

    /**
     * This function is triggered when a user clicks on the delete button on a contact.
     * It removes the object from the list, reassigns the list from the service
     * and then shows a message to the user to confirm that the contact was deleted.
     * @param  {Object} contact Contact object
     */
    this.deleteContact = function deleteContact(contact) {
      this.contactsList.splice(this.contactsList.findIndex(function findMatchingContact(element) {
        return element === contact;
      }),1);
      this.contactsList = phonebookFactory.getContactsList();
      this.showMessage("Contact removed.");
    };

    /**
     * This function is triggered when a user clicks on the star button on a contact.
     * It finds the correct contact and then toggles the value of the star key
     * between 0 and 1.
     * @param  {Object} contact Contact object
     */
    this.starContact = function starContact(contact) {
      if (contact.star) {
        contact.star = 0;
      } else {
        contact.star = 1;
      }
    };

    /**
     * This function can take in any string and will assign it to this.message
     * which in turn will display it to the user.
     * @param  {String} message A string of the message to display.
     */
    this.showMessage = function showMessage(message) {
      this.message = message;
      $timeout(this.hideMessage, 2000);
    };

    /**
     * This function clears the user message;
     */
    this.hideMessage = function hideMessage() {
      that.message = "";
    };

    /**
     * This function takes in a form and resets it to ng-Pristine.
     * @param {Form Object} form A form object
     */
    this.resetForm = function resetForm(form) {
      form.$setPristine(true);
    };
  }

})();
