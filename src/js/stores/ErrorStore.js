var AppDispatcher = require('../../AppDispatcher');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

var CHANGE_EVENT = 'change';

var _error = false;
var ErrorStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getErrorState: function() {
    return _error;
  }
});

ErrorStore.dispatchToken = AppDispatcher.register(function(payload){
  switch (payload.type) {
    case 'api_error':
      _error = true;
      ErrorStore.emitChange();
      break;
    case 'error_cleared':
      _error = false;
      ErrorStore.emitChange();
      break;
    default:
      break;
  }
});

module.exports = ErrorStore;