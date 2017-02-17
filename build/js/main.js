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

  /**
   * This function returns the contact list unless it is empty. Then it returns
   * a default list.
   * @return {Array} An array of the contacts.
   */
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

  /**
   * This function takes in a contact as an object, checks to see if it is a
   * duplicate, and, if it isn't, it adds it to the contactsList array.
   * @param {Object} contact Contact object
   */
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

  /**
   * This function takes in a phone number, removes any extra characters and
   * formats the number like this: 555-555-5555.
   * TODO: There is a better way to do this using regex.
   * @param  {String} numberAsString A phone number
   * @return {String}                A phone number formatted correctly
   */
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