const mysql = require('mysql2');
const inquirer = require("inquirer");

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'rootroot',
        database: 'company_db'
    },
    console.log(`Connected to the books_db database.`)
);

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
            ]
        })
        .then(data => {
            console.log(data)
            if (data.task == "View all departments") {
                viewDepartments()
            } else if (data.task == "View all roles") {
                viewRoles()
            } else if (data.task == "View all employees") {
                viewEmployees()
            } else if (data.task == "Add a department") {
                addDepartment()
            } else if (data.task == "Add a role") {
                addRole()
            } else if (data.task == "Add an employee") {
                addEmployee()
            } else if (data.task == "Update Employee Role") {
                updateEmployeeRole()
            }
        })
}

function viewDepartments() {
    db.query("SELECT * FROM department", (err, result) => {
        if (err) {
            console.error(err)
        } else {
            console.table(result)
            firstPrompt()
        }
    })
}

function viewRoles() {
    db.query("SELECT * FROM role", (err, result) => {
        if (err) {
            console.error(err)
        } else {
            console.table(result)
            firstPrompt()


        }
    })
}

function viewEmployees() {
    db.query("SELECT * FROM employee", (err, result) => {
        if (err) {
            console.error(err)
        } else {
            console.table(result)
            firstPrompt()


        }
    })
}

function addDepartment() {
    inquirer
        .prompt({
            type: "input",
            name: "addDepartment",
            message: "What department would you liket to add?",
        }).then(answer => {
            db.query(`INSERT INTO department (name) VALUES ('${answer.addDepartment}')`, (err) => {
                if (err) {
                    console.error(err)
                } else {
                    console.log("Succesfully Added")
                    firstPrompt()
                }
            })
        })

}

function addRole() {
    db.query("SELECT * FROM department", (err, results) => {
        if (err) {
            console.error(err)
        }
        let roleChoices = results.map(role => ({
            value: role.id,
            name: role.name
        }))

        inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "What is the name of the new role you would like to add?",
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary for this role?"
            },
            {
                type: "list",
                name: "department_id",
                message: "Choose a department that the role belongs to",
                choices: roleChoices,
            }
        ])
            .then(answers => {
                console.log(answers)
                db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answers.title}',${answers.salary}, ${answers.department_id})`,
                    (err) => {
                        if (err) {
                            console.error(err)
                        } else {
                            console.log("Successfully Added!")
                            firstPrompt()
                        }
                    })
            })
    })
}

function addEmployee() {
    db.query("SELECT * FROM role", (err, results) => {
        if (err) {
            console.error(err)
        }
        let roleChoices = results.map(role => ({
            value: role.id,
            name: role.title
        }))
        db.query("SELECT * FROM employee", (err, results) => {
            if (err) {
                console.error(err)
            }
            let employeeChoices = results.map(employee => ({
                value: employee.id,
                name: employee.first_name
            }))

            //Write inquirer here  
            inquirer.prompt([
                {
                    type: "input",
                    name: "first_name",
                    message: "What is the first name of the employee you would like to add?",
                },
                {
                    type: "input",
                    name: "last_name",
                    message: "What is the last name of the employee you would like to add?",
                },
                {
                    type: "list",
                    name: "role",
                    message: "What is this employees role?",
                    choices: roleChoices,
                },
                {
                    type: "list",
                    name: "employee_id",
                    message: "Who is this employee reporting to?",
                    choices: employeeChoices,
                }
            ])
                .then(answers => {
                    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.first_name}','${answers.last_name}', ${answers.role}, ${answers.employee_id})`,
                        (err) => {
                            if (err) {
                                console.error(err)
                            } else {
                                console.log("Successfully Added!")
                                firstPrompt()
                            }
                        })
                })
        })
    })
}
    function updateEmployeeRole() {
        db.query("SELECT * FROM employee", (err, results) => {
            if (err) {
                console.error(err)
            }
            let employeeChoices = results.map(employee => ({
                value: employee.id,
                name: employee.first_name
            }))

                inquirer.prompt({                   
                        type: "list",
                        name: "employee",
                        message: "What employee would you like to update?",
                        choices: employeeChoices,                   
            })
                    .then(answers => {
                         console.log(answers)
                        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.first_name}','${answers.last_name}', ${answers.role}, ${answers.employee_id})`,
                            (err) => {
                                if (err) {
                                    console.error(err)
                                } else {
                                    console.log("Successfully Added!")
                                    firstPrompt()
                                }
                            })
                    })
            })
        }