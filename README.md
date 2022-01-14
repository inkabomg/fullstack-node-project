# Learn Finnish - app
An application that can be used to improve foreign language grammar skills. The end user is prompted with foreign language words and user must write the correct Finnish translation. Or vice versa.

The app contains two views, one for admin and one for end user. Admin can create, delete and update word pairs (english - finnish). These are stored in database. The user is presented UI where user can train these words. User is displayed score when they have submitted answers and wished to see results.

## Installation

Through cloning with git:

`git clone https://github.com/inkabomg/fullstack-node-project.git`

Install npm packages

`npm install`


## Backend usage

Create a .env file in the root directory. Add environment-specific variables on new lines in the form of NAME=VALUE. For example:
```
DB_HOST = mydb.tamk.fi

DB_USER = userName

DB_PASSWORD = password123

DB_DB = database
```
process.env now has the keys and values you defined in your .env file.

```
const db = require('db')
db.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
})
```

Nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.

Nodemon does not require any additional changes to your code or method of development. Nodemon is a replacement wrapper for node. To use nodemon, replace the word node on the command line when executing your script.

Nodemon wraps your application, so you can pass all the arguments you would normally pass to your app:

`nodemon index.js`


## Motivation
This is a Backend Development course project work, a full stack application using:
- Frontend with React
- Backend with Express/Node.js
- MySQL Database which is accessed using mysql - module

## Overview of the project
<div align="center">
  <p>(Click photo to open YouTube link)</p>
  <a href="https://www.youtube.com/watch?v=2u0KxLf4cBQ">
  <img 
    src="https://imgur.com/ySGrRGS.png" 
    alt="Backend Development - Project Work" 
    style="width:80%; margin: auto;">
  </a>
</div>
