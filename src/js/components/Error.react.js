var React = require('react');

var ErrorActionCreators = require('../actions/ErrorActionCreators');

var Error = React.createClass({
  getDefaultProps: function() {
    return {
      error: false
    };
  },

  render: function() {
    return this._renderError();
  },

  _renderError: function() {
    if(this.props.error) {
      return ( 
        <div className="_errorNotification">
          <span className="_dismissError" onClick={this._clearError}>X</span>
          <h3>An Error Has Occured</h3>
        </div>
      );
    } 

    return null;
  },

  _clearError: function() {
    ErrorActionCreators.clearError();
  }
});

module.exports = Error;