// const mysql = require('mysql2');
const inquirer = require("inquirer");
// require('dotenv').config();

// connection.connect(function (err) {
//     if (err) throw err;
//     firstPrompt();
//   });
  firstPrompt()
  function firstPrompt() {

    inquirer
      .prompt({
        type: "list",
        name: "task",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update Employee Role",
          "End"
        ]
      })
    } 