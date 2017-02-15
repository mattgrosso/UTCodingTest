(function() {
  'use strict';

  angular
    .module('phone', []);

})();

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

//# sourceMappingURL=main.js.map