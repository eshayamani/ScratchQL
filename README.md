# ScratchQL

[Design Page](https://eshayamani.github.io/ScratchQL/src/index.html)

## Group Members 
- Sophia Guarnotta
- Esha Yamani
- Ponthea Zahraii
  
## Motivation 
Having all taken the database course and having worked with databases in the past for different projects such as research, we thought having a project centered around databases and making it easy to query a database for people with little to no SQL experience seemed very appealing to us. Also, using software that has good UIs for accessing databases is not easily accessible to the public as companies such as Oracle and Amazon put them behind paywalls and are mainly supported by companies. Having something like ScratchQL would be very useful because it would allow for a user-friendly way to query databases, as one would not have to learn SQL. 

## Description of Project 
### What is the project?
The project would consist of a querying tool for databases. The backend of the project would use pre-existing databases that can be accessed through SQL along with Blockly to implement the functionality. To ensure security, ScratchQL would only allow users to query using SELECT statements. This allows for control over access, giving users only what they need in order to maintain data security.

### How does the project related to parsing, interpretation and compilation
The project implements parsing as it will be used to understand and translate SQL statements. The first step after submitting a query is to check whether the query is valid and if it will run smoothly with the database, and this is done through parsing. ScratchQL ensures this by making sure all the queries follow the same format that cannot be edited or changed by the user to allow for consistency. 

## Instructions
### Connecting to the Database
- [mySQL installation](https://dev.mysql.com/downloads/installer/)
    - This contains instructions that helps with the installation of mySQL which we use to run the queries generated by our blocks.
    - Once this is downloaded you are able to run MySQL in your terminal
- In your terminal, type 'mysql --host=34.27.128.43 --user=root --password'
    - when prompted for password, type in pl
    - you are now in our cloud mysql server
    - YOU WILL ONLY BE ALLOWED TO CONNECT ON THE CHAPMAN CAMPUS WIFI, if for some reason you need to connect from elsewhere we would need to add your public IP address to the network connection configuration of the cloud server.
- To connect to the sakila database, type 'USE sakila;'
    - If you want to check to make sure you are in the database, type: 'SHOW TABLES;'
### Generate a Query
- [ScratchQL Blockly](https://eshayamani.github.io/ScratchQL/src/index.html)
    - Use our blockly interface to build a query with blocks
    - Once you are done, click the Generate Python button, which will output the SQL query that can be run in MySQL.
    - Copy the query to clipboard and paste it into your terminal.

## Future Work
- In the future we would like to either find a server that Is able to connect to the blockly page without issues or simply eliminate the need for blockly and make this program on a different front end. We would additionally add some features that automatically support different databases in case inexperienced users want to access this and use it without changing the code.

- If someone else wishes to make changes to this project, they can fork it to their own github and personalize it for their database and add any blocks they may want. If someone wants us to fix something in our project, they can raise an issue on our repo. 

## Work Division
- Sophia Guarnotta
    - Design Files
        - Worked on design files for submissions
    - Code for Blocks
        - Worked on code generation for queries
    - Cloud Database Integration
        - Also tried to make connection from back to front end
- Esha Yamani
    - Code for Blocks
        - Continued code set up and worked on WHERE, LIMIT, COMPARE, and input blocks
        - Worked on code generation for queries
    - [Demo Video](milestone1/Demo1.mp4)
        - Recorded demo video for milestone 1
- Ponthea Zahraii
    - Code for Blocks
        - Initial code set up that include basic SELECT, FROM, and WHERE blocks
    - html file
        - Worked on getting the blocks on the git hub page
