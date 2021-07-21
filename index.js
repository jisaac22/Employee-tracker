// packages to run app
const inquirer = require('inquirer')
const fs = require('fs')
const mysql = require('mysql')

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'jisaac22',
  database: 'employeeTracker_db'
});

// First question for Employers choice
const employeeUpdate = () => {
    inquirer.prompt ([
        {
            type:'list',
            name:'employeeChoice',
            message: "What would you like to do?",
            choices:['View all Employees', 
                      'View Employees by Department', 
                      'Remove Employees', 
                      'View all Employees by Manager', 
                      'Add Employee', 
                      'Remove Employee', 
                      'Update Empoyee Role',
                      'Update Employee Manager'
                    ]
        }
    ]).then( function(answer) {
      console.log(answer.employeeChoice)
    }); 
};

employeeUpdate()
