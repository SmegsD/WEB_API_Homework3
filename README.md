# WEB_API_Homework3
homework 3 for web apis


Give one reason (there are many) OAuth tokens should not be granted in the main flow, assuming the user has sent in the correct credentials.

This is because it is a security breach. The token can be acquired by unwanted parties easier if the main flow is not safe to generate tokens. The main flow is not a safe place to store a token. It will allow for too many security breach opportunities. 
