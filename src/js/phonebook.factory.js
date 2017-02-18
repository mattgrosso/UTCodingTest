(function() {
  'use strict';

  angular
    .module('phone')
    .factory('phonebookFactory', phonebookFactory);


  // var contactsList = [];

  var contactsList = [
    {
      ID: 294704,
      firstName: "Matt",
      lastName: "Grosso",
      phone: "3123439740",
      star: 0
    },
    {
      ID: 294705,
      firstName: "Unleashed",
      lastName: "Technologies",
      phone: "4108648980",
      star: 0
    },
    {
      ID: 294706,
      firstName: "Empire",
      lastName: "Carpet",
      phone: "8005882300",
      star: 0
    },
    {
      ID: 294744,
      firstName: "Jenny",
      lastName: "Tutone",
      phone: "3018675309",
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
   * This function returns the contact list.
   * @return {Array} An array of the contacts.
   */
  function getContactsList() {
    return contactsList;
  }

  /**
   * This function takes in a contact as an object, checks to see if it is a
   * duplicate, and, if it isn't, it adds it to the contactsList array.
   * @param {Object} contact Contact object
   */
  function addContact(contact) {
    var duplicate = false;
    contactsList.forEach(function checkForDuplicates(each) {
      if (each.phone === removeNaNs(contact.phone)) {
        duplicate = true;
      }
    });

    if (!duplicate) {
      contact.ID = Math.floor(Math.random()*1000000); // TODO: This is not a secure ID at all. Just a useful workaround for now.
      contact.star = 0;
      contact.phone = removeNaNs(contact.phone);
      contactsList.push(contact);
    }
  }

  /**
   * This function takes in a phone number and removes any non-number characters.
   * @param  {String} numberAsString A phone number
   * @return {String}                A phone number without extra characters
   */
  function removeNaNs(numberAsString) {
    return numberAsString.replace(/[^0-9]/g, '');
  }

})();
