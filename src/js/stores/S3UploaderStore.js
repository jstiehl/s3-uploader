var AppDispatcher = require('../../AppDispatcher');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

var CHANGE_EVENT = 'change';

var _credentials = null;
var _uploadInProgress = false;
var _uploadProgress = null;

var S3UploaderStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  _credentialsReceived: function(data) {
    _credentials = data;
  },

  getCredentials: function() {
    return _credentials;
  },

  getUploadInProgress: function() {
    return _uploadInProgress;
  },

  getUploadProgress: function() {
    return _uploadProgress;
  }
});

S3UploaderStore.dispatchToken = AppDispatcher.register(function(payload){
  switch (payload.type) {
    case 'aws_credentials_received':
      S3UploaderStore._credentialsReceived(payload.data);
      S3UploaderStore.emitChange();
      break;
    case 'aws_upload_progress':
      _uploadProgress = payload.data;
      _uploadInProgress = true;
      S3UploaderStore.emitChange();
      break;
    case 'aws_upload_complete':
      _uploadProgress = null;
      _uploadInProgress = false;
      _credentials = null;
      S3UploaderStore.emitChange();
      break;
    default:
      break;
  }
});

module.exports = S3UploaderStore;