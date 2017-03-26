var React = require('react');
//components
var Error = require('./Error.react');
var ErrorStore = require('../stores/ErrorStore');

var ErrorContainer = React.createClass({
  getInitialState: function() {
    return {
      error: false
    };
  },

  componentDidMount: function() {
    ErrorStore.addChangeListener(this._getErrorState);
  },

  componentWillUnmount: function() {
    ErrorStore.removeChangeListener(this._getErrorState);
  },  

  render: function() {
    return <Error 
      error={this.state.error} />
  },

  _getErrorState: function() {
    var error = ErrorStore.getErrorState();
    this.setState({
      error: error
    });
  }
})

module.exports = ErrorContainer;