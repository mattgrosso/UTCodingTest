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
