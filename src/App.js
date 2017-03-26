var React = require('react');
var S3UploaderContainer = require('./js/components/S3UploaderContainer.react');
var ErrorContainer = require('./js/components/ErrorContainer.react');

import './App.css';
import logo from './rain-cloud.svg';

var App = React.createClass ({
  render: function() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>s3 Uploader</h2>
        </div>
        <div className="App-intro">
          <S3UploaderContainer />
        </div>
        <ErrorContainer />
      </div>
    );
  }
});

export default App;
