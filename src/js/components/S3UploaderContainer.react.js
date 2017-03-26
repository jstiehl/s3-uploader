var React = require('react');
var S3Uploader = require('./S3Uploader.react');
var S3UploaderStore = require('../stores/S3UploaderStore');

/**
 * S3UploaderContainer is responsible for fetching weather data from store or initiating action to fetch data
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
        signature={this.state.signature}
        uploadInProgress={this.state.uploadInProgress}
        progress={this.state.progress} />
    );
  },

  _getUploadData: function() {
    var signature = S3UploaderStore.getSignature();
    var uploadInProgress = S3UploaderStore.getUploadInProgress() || false;
    var progress = S3UploaderStore.getUploadProgress() || 0;
    this.setState({
      signature: signature,
      uploadInProgress: uploadInProgress,
      progress: progress
    });
  }
});

module.exports = S3UploaderContainer;