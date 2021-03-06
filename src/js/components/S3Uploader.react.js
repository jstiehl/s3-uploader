var React = require('react');
var _ = require('underscore');
var moment = require('moment-timezone');
var Spinner = require('react-spinkit');

var S3UploaderActionCreators = require('../actions/S3UploaderActionCreators');

/**
 * S3Uploader component receives props with upload data
 * when a file is selected, the component makes an api call to receive the appropriate
 * credentials necessary for uploading the file to s3
 */
var S3Uploader = React.createClass({

  getInitialState: function(){
    return {
      file: null,
      fileType: null
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if(this.props.progress && !nextProps.progress){
      this.setState({
        file: null,
        fileType: null
      });
    }
  },

  render: function() {
    return (
      <div>
        <h3>Select file to upload to s3</h3>
        <form encType="multipart/form-data" className="_file-upload" onSubmit={this._onSubmit}>
          <input onChange={this._fileSelected} type="file" name="upload_file" className="_choose-file"/>
          <button type='submit' disabled={!this.state.file} className="_upload-button">Upload File</button>
        </form>
        {this._spinner()}
      </div>
    )
  },

  _spinner: function() {
    if(this.props.uploadInProgress){
      return (
        <div className="_spinner">
          Upload In Progress
          <Spinner spinnerName='wordpress' noFadeIn />
          {this.props.progress + '%'}
        </div>
      );
    }
  },

  _onSubmit: function(e) {
    e.preventDefault();
    if (!this.props.credentials) {
      this._fetchCredentials(this.state.fileType);
    }
    else {
      e.target.upload_file.value = null; //remove the file name from the input display
      this._uploadToS3(this.props.credentials);
    }
  },

  _uploadToS3: function(creds) {
    creds = creds || this.props.credentials;
    if (this.state.file) {
      var data = new FormData();
      data.append('key', creds.path + this.state.fileName);
      data.append('Content-Type', this.state.fileType);
      data.append('acl', 'bucket-owner-full-control');
      data.append('x-amz-server-side-encryption', 'AES256');
      data.append('x-amz-credential', creds.key_id + '/' + moment(creds.date).utc().format('YYYYMMDD') + '/' + creds.region + '/s3/aws4_request');
      data.append('x-amz-algorithm', 'AWS4-HMAC-SHA256');
      data.append('x-amz-date', creds.date);
      data.append('x-amz-meta-tag', '');
      data.append('policy', creds.policy);
      data.append('x-amz-signature', creds.signature);
      data.append('file', this.state.file);

      S3UploaderActionCreators.uploadToS3(data, creds.bucket);
    }
  },

  _fileSelected: function(e) {
    e.preventDefault();
    var file = e.nativeEvent.target.files[0];
    var fileType = file.type;
    this.setState({
      file: file,
      fileType: fileType,
      fileName: file.name
    });
    if(!this.props.credentials){
      this._fetchCredentials(fileType);
    }
  },

  _fetchCredentials: function(fileType) {
    S3UploaderActionCreators.fetchAWSCredentials(fileType);
  }
});

module.exports = S3Uploader;