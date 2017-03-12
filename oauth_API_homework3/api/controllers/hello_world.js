'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
 */

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

 It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');

/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
 - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
 - Or the operationId associated with the operation in your Swagger document

 In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
 we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
    getGit: testGitHub
};

/*
 Functions in a127 controllers used for operations should take two parameters:

 Param 1: a handle to the request object
 Param 2: a handle to the response object
 */

function testGitHub(req, res) {

    var githubApi = require("github");

    var github = new githubApi({
        version: '3.0.0'
    });

//vault use
    var vault = require('avault').createVault(__dirname);
    //avault();

    vault.get('sigad', function (profileString) {
        var token = JSON.parse(profileString);
        console.log(token);
        github.authenticate({
            type: "oauth",
            token: token.token
        });
    });



    github.users.get({}, function (err, resp) {
        console.log("GOT ERR?", err);
        console.log("GOT RES?", resp);

        github.repos.getAll({}, function (err, resp) {
            console.log("GOT ERROR.?", err);
            console.log("GOT RESPONSE.?", resp);
            res.send(resp);
        });
    });

    //vault function
}
/*function avault() {
 var vault = require('avault').createVault(__dirname);
 var keyName = 'key1';
 vault.generateKey(keyName).then(
 function (keyResponse) {
 vault.store(keyName, '{"token": "gitHub_Token"}', 'sigad').then(
 function (storeResponse) {
 console.log('Error', storeResponse);
 },
 function (err){
 console.log('Error',err);
 });

 },
 function (err) {
 console.log('Error', err);
 });

 }
 */

