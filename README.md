# ScratchQL

## Group Members 
- Sophia Guarnotta
- Esha Yamani
- Ponthea Zahraii

## Motivation 
Having all taken the database course and having worked with databases in the past for different projects such as research, we thought having a project centered around databases and making it easy to query a database for people with little to no SQL experience seemed very appealing to us. Also, using software that has good UIs for accessing databases is not easily accessible to the public as companies such as Oracle and Amazon put them behind paywalls and are mainly supported by companies. Having something like ScratchQL would be very useful because it would allow for a user-friendly way to query databases, as one would not have to learn SQL. 

## Description of Project 
### What is the project?
The project would consist of a querying tool for databases. The backend of the project would use pre-existing databases that can be accessed through SQL along with Blockly to implement the functionality. To ensure security, ScratchQL would only allow users to query using SELECT, INSERT, UPDATE, and DELETE. This allows for control over access, giving users only what they need in order to maintain data security.

### How does the project related to parsing, interpretation and compilation
The project implements parsing as it will be used to understand and translate SQL statements. The first step after submitting a query is to check whether the query is valid and if it will run smoothly with the database, and this is done through parsing. ScratchQL ensures this by making sure all the queries follow the same format that cannot be edited or changed by the user to allow for consistency. 
