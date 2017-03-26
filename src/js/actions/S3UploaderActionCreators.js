var request = require('superagent');
var AppDispatcher = require('../../AppDispatcher');
var config = require('../../config');
var API_URL = config.API_URL;

var S3UploaderActionCreator = {
  /**
   * fetchMonthlyWeatherData makes api call to server to fetch monthly weather data
   * @param  {String} month is the month of interest
   * @return {Action} dispatches with monthyl_data_received action typ and monthly weather data
   */
  fetchAWSCredentials: function(type) {
    request.get(API_URL + 'awscredentials?type='+type)
      .end(function(err, res){
        var data = res.body.data;
        if(err) {
          //need to add error handling
          console.log(err);
        }
        var action = {
          type: 'aws_credentials_received',
          data: data
        };
        AppDispatcher.dispatch(action);
      });
  },

  uploadToS3: function(data, bucket) {
    var url = 'https://' + bucket + '.s3.amazonaws.com/';
    var xhr = new XMLHttpRequest();
    xhr.open('post', url);
    //track upload progress
    var updateProgress = function(e) {
      var percentage = Math.round((e.loaded/e.total)*100);
      var action = {
        type: 'aws_upload_progress',
        data: percentage
      };
      AppDispatcher.dispatch(action);
    };
    xhr.upload.addEventListener("progress", updateProgress);
    
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 400) {
          //need to add error handling
          console.log("Error");
        }
        var action = {
          type: 'aws_upload_complete'
        };
        AppDispatcher.dispatch(action);
      }
    };
    xhr.send(data);
  }
};

module.exports = S3UploaderActionCreator;