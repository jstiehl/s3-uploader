var React = require('react');
var S3Uploader = require('./S3Uploader.react');
var S3UploaderStore = require('../stores/S3UploaderStore');

/**
 * S3UploaderContainer is responsible for fetching upload data from store
 * data is passed to S3Uploader component for rendering of data
 */
var S3UploaderContainer = React.createClass({

  getInitialState: function() {
    return {
      uploadInProgress: false,
      progress: 0
    }
  },

  componentWillMount: function() {
    this._getUploadData();
  },

  componentDidMount: function() {
    S3UploaderStore.addChangeListener(this._getUploadData);
  },

  componentWillUnmount: function() {
    S3UploaderStore.removeChangeListener(this._getUploadData);
  },

  render: function() {
    return (
      <S3Uploader 
        credentials={this.state.credentials}
        uploadInProgress={this.state.uploadInProgress}
        progress={this.state.progress} />
    );
  },

  _getUploadData: function() {
    var credentials = S3UploaderStore.getCredentials();
    var uploadInProgress = S3UploaderStore.getUploadInProgress() || false;
    var progress = S3UploaderStore.getUploadProgress() || 0;
    this.setState({
      credentials: credentials,
      uploadInProgress: uploadInProgress,
      progress: progress
    });
  }
});

module.exports = S3UploaderContainer;