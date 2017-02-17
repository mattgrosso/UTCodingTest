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
    this.contactsList = phonebookFactory.getContactsList();
    this.sortColumn = 'lastName';
    this.sortReverse = false;
    this.tableFilter = "";
    this.collapsed = true;

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
      this.contactsList = phonebookFactory.getContactsList();
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

    this.test = function test() {
      console.log('This is a flag');
      console.log(this.collapsed);
    };
  }

})();

(function() {
  'use strict';

  angular
    .module('phone')
    .factory('phonebookFactory', phonebookFactory);


  // var contactsList = [];

  var contactsList = [
    {
      ID: 294704,
      firstName: "Matthew",
      lastName: "Grosso",
      phone: "312-343-9740",
      star: 0
    },
    {
      ID: 294705,
      firstName: "Carrie",
      lastName: "Seltzer",
      phone: "312-343-9747",
      star: 0
    },
    {
      ID: 294706,
      firstName: "Natalie",
      lastName: "Grosso",
      phone: "202-291-4371",
      star: 0
    },
    {
      ID: 294744,
      firstName: "Marie",
      lastName: "Dennis",
      phone: "703-403-0403",
      star: 0
    }
  ];

  function phonebookFactory() {
    return {
      contactsList: contactsList,
      getContactsList: getContactsList,
      addContact: addContact
    };
  }

  function getContactsList() {
    if (contactsList.length > 0) {
      return contactsList;
    } else {
        return [
        {
          ID: 1,
          firstName: "Jane",
          lastName: "Doe",
          phone: "555-555-5555",
          star: 0
        }
      ];
    }
  }

  function addContact(contact) {
    var duplicate = false;
    contactsList.forEach(function checkForDuplicates(each) {
      if (each.phone === formatPhoneNumber(contact.phone)) {
        duplicate = true;
      }
    });

    if (!duplicate) {
      contact.ID = Math.floor(Math.random()*1000000); // TODO: This is not a secure ID at all. Just a useful workaround for now.
      contact.star = 0;
      contact.phone = formatPhoneNumber(contact.phone);
      contactsList.push(contact);
    }
  }

  function formatPhoneNumber(numberAsString) {
    var formatted = [];
    var splitString = numberAsString.split("");
    var filtered = splitString.filter(function (each) {
      console.log(isNaN(each));
      return !isNaN(each);
    });
    formatted.push(filtered[0]);
    formatted.push(filtered[1]);
    formatted.push(filtered[2]);
    formatted.push("-");
    formatted.push(filtered[3]);
    formatted.push(filtered[4]);
    formatted.push(filtered[5]);
    formatted.push("-");
    formatted.push(filtered[6]);
    formatted.push(filtered[7]);
    formatted.push(filtered[8]);
    formatted.push(filtered[9]);
    return formatted.join("");
  }

})();

//# sourceMappingURL=main.js.map