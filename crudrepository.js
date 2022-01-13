const mysql = require("mysql");

require("dotenv").config();

// Creating connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
});

let connectionFunctions = {
  // connect: () => {
  //   database.connect((err) => {
  //     if (err) {
  //     console.log(err);
  //     } else {
  //       console.log("Connection established")
  //     }
  //   });
  // },

  // close: () => {
  //   database.end((err) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //   });
  // },

  save: (input1, input2, input3) => {
    function add(resolve, reject) {
      pool.query(
        `INSERT INTO vocabulary (tag, english, finnish) VALUES (?,?,?)`,
        [input1, input2, input3],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve("New word pair added succesfully");
          }
        }
      );
    }
    return new Promise(add);
  },

  findAll: () => {
    function find(resolve, reject) {
      pool.query(`SELECT * FROM vocabulary`, (err, vocabulary) => {
        if (err) {
          reject(err);
        } else {
          resolve(vocabulary);
        }
      });
    }
    return new Promise(find);
  },

  deleteById: (id) => {
    function deleteBy(resolve, reject) {
      pool.query(
        `DELETE FROM vocabulary WHERE id = ?`,
        id,
        (err, vocabulary) => {
          if (err) {
            reject(err);
          } else {
            resolve(`Deleted word with id = ` + id, vocabulary);
          }
        }
      );
    }
    return new Promise(deleteBy);
  },

  findById: (id) => {
    function findBy(resolve, reject) {
      pool.query(
        `SELECT * FROM vocabulary WHERE id = ?`,
        id,
        (err, vocabulary) => {
          if (err) {
            reject(err);
          } else {
            resolve(vocabulary);
          }
        }
      );
    }
    return new Promise(findBy);
  },

  findByTag: (tag) => {
    function findBy(resolve, reject) {
      pool.query(
        `SELECT * FROM vocabulary WHERE tag = "${tag}"`,
        tag,
        (err, vocabulary) => {
          if (err) {
            reject(err);
          } else {
            resolve(vocabulary);
          }
        }
      );
    }
    return new Promise(findBy);
  },

  editById: (id, word) => {
    function editBy(resolve, reject) {
      pool.query(
        `UPDATE vocabulary SET tag = "${word.tag}", english = "${word.english}", finnish = "${word.finnish}" WHERE id = ${id}`,
        (err, vocabulary) => {
          if (err) {
            reject(err);
          } else {
            resolve(vocabulary);
          }
        }
      );
    }
    return new Promise(editBy);
  },
};

module.exports = connectionFunctions;
