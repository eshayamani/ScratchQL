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
- The data would be a relational database that we would access through SQL queries. 
- The database would have to be relational and have the necessary elements but is flexible in terms of the information that is actually being stored because we want our program to apply to all situations. 

## External Requirements
- Our code currently doesn't require any external devices