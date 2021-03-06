# s3-uploader
React App for uploading a file to s3. Requires [s3-signature](https://github.com/jstiehl/s3-signature) to also be running.  This app allows a user to select a file (10 MB limit) and upload it to an s3 Bucket (s3 Bucket must already exist and be setup to allow bucket owner full control).  Client app makes a call to [s3-signature](https://github.com/jstiehl/s3-signature) server on file selection to generate the appropriate [POST policy](http://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-UsingHTTPPOST.html) needed to upload file to s3. File can then be uploaded by pressing the Upload File button.  

![screen shot 2017-03-26 at 2 30 17 pm](https://cloud.githubusercontent.com/assets/5668826/24335393/ebeb6ae2-1230-11e7-8330-69baef7cc47c.png)

This app is built off of the [Create React App](https://github.com/facebookincubator/create-react-app) package.

#Running App
To run the app

1. Clone this repo locally.
2. Navigate to the root directory of the project on your local machine.
3. Run `npm install` to install dependencies.
4. App can be run locally by running the `npm start` command in the root directory of this project.  Browser should open up automatically but if it doesn't you can navigate to `'http://localhost:3000` to launch the app in your browser.  NOTE: you will need to setup [s3-signature](https://github.com/jstiehl/s3-signature) server and have it running before you can successfully upload files to s3.  
