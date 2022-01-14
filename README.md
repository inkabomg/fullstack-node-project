# Learn Finnish - app
An application that can be used to improve foreign language grammar skills. The end user is prompted with foreign language words and user must write the correct Finnish translation. Or vice versa.

The app contains two views, one for admin and one for end user. Admin can create, delete and update word pairs (english - finnish). These are stored in database. The user is presented UI where user can train these words. User is displayed score when they have submitted answers and wished to see results.

<div align="center">
  <img src="https://imgur.com/Ea6Y7xP.png" width="45%"> <img src="https://imgur.com/8AwkVcP.png" width="46.4%">
  <img src="https://imgur.com/q2LsoYL.png" width="32%"> <img src="https://imgur.com/QaX5MSG.png" width="27%"> <img src="https://imgur.com/nXcx2mM.png" width="32%"> </div>

## Installation

Through cloning with git:

`git clone https://github.com/inkabomg/fullstack-node-project.git`

Install npm packages

`npm install`

## Frontend
### Start & watch
`npm start` or `yarn start` => _You can now view frontend in the browser. http://localhost:3000_

## Backend
### Dotenv:

Create a .env file in the root directory. Add environment-specific variables on new lines in the form of NAME=VALUE. For example:
```js
DB_HOST = mydb.tamk.fi
DB_USER = userName
DB_PASSWORD = password123
DB_DB = database
```
process.env now has the keys and values you defined in your .env file.

```js
const db = require('db')
db.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DB,
})
```

Example of the data that will be included in the database:
```sql
CREATE TABLE vocabulary (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tag VARCHAR(10) NOT NULL,
    english VARCHAR(20) NOT NULL,
    finnish VARCHAR(20) NOT NULL,
);
```

```html
[
  {
    "id": 1,
    "tag": "animals",
    "english": "mouse",
    "finnish": "hiiri"
  },
  {
    "id": 2,
    "tag": "colors",
    "english": "purple",
    "finnish": "violetti"
  }
]
```

### Nodemon:

Nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.

Nodemon does not require any additional changes to your code or method of development. Nodemon is a replacement wrapper for node. To use nodemon, replace the word node on the command line when executing your script.

Nodemon wraps your application, so you can pass all the arguments you would normally pass to your app:

`nodemon index.js`

=>
```node.js
[nodemon] starting `node index.js`
Listening on port 8080
```

<div align="center">
  
```css
You need both, frontend compiled successfully AND backend database connection on to use the app!
```
 </div>

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
