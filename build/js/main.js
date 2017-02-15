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

//# sourceMappingURL=main.js.map