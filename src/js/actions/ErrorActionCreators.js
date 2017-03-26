var AppDispatcher = require('../../AppDispatcher');

var ErrorActionCreators = {
  clearError: function() {
    var action = {
      type: 'error_cleared'
    };
    AppDispatcher.dispatch(action);
  }
};

module.exports = ErrorActionCreators;