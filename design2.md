# Design Pt.2

## Execution and Output
- The code will allow the user to grab certain elements from the database using key words. The parameters for these queries will be inputted by the user. 
- There is currently one piece of Blockly code that executes the basic select query in SQL that implements SELECT and WHERE.
- The output for this code will be the specific rows from the database that match the requirements given by the user.

## Recursive Program
- We can use recursive Blockly programs to implement subqueries in the code. 
- Subqueries can be defined as a query within a query so the main query would have to call itself in order to run the subquery.
- These type of queries are usually only done within the SELECT, FROM, and WHERE statements allowing for many complex queries.

## Data Description
- We will be using the Sakila sample database, which is a database provided by MySQL, for our testing.
- This database contains 17 tables in a relational database acting as a movie rental store. Some of the included tables are actor, which contains names of actors and an ID, film, which contains the film name and ID, and film_actor which connects an actor ID to a film ID. There are also tables for prices and customer information.
- Tables in the database will contain both strings and integers that can be output by queries. 
- In the long run, we would like to be able to use our program for any existing relational database, not just this one. 

## External Requirements
- Our code currently doesn't require any external devices
