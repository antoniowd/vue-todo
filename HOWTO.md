# Fronted Exam

Steps to configure and run the required exam in the readme

### Requirements

I developed the exam with the version of node.js 10.15.0 but it must work with older versions

Remember execute `npm install` or `npm update` to load the node modules in the package.json

### Run the project

`npm start`

This command setup the json-server and a development web server to see the project in operation. 

You can access https://localhost:8080 to see result.

Alternatively you can also run `npm run dev` and `npm run server` on different consoles to start the project

### Unit test 

`npm run test`

To execute the unit tests it is necessary that the json-server is running. To run the json-server you can run the command `npm run server` or if you already run `npm start` the json-server will be running at http://localhost:3000

### NPM commands

* `npm start`: Start the project on http://localhost:8080
* `npm run build`: Build the project files in the dist folder
* `npm run test`: Run the unit tests with Jest
* `npm run dev`: Run the development web server on http://localhost:8080
* `npm run server`: Run the json-server on http://localhost:3000
* `npm run lint`: Check that the code complies with the Airbnb style guide

### Observations

Sometimes the json-server is not able to support simultaneous requests, causing the server to crash