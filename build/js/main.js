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

(function() {
  'use strict';

  angular
    .module('phone')
    .factory('phonebookFactory', phonebookFactory);

  function phonebookFactory() {
    return {
      contactsList: contactsList
    };
  }

  var contactsList = [];

})();

//# sourceMappingURL=main.js.map