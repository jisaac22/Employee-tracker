// packages to run app
const inquirer = require('inquirer')
const fs = require('fs')
const mysql = require('mysql');
const { allowedNodeEnvironmentFlags } = require('process');
require('console.table')

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
                      'View Departments',
                      'View Roles', 
                      'Add Employee',
                      'Add Departments',
                      'Add Roles',
                      'Update Employee Role',
                      'Exit'
                    ]
        }
    ]).then((answer) => {
      switch(answer.employeeChoice){
        case 'View all Employees':
          viewAllEmployees();
          break;
        
        case 'View Departments':
          viewDepartments();
          break;

        case 'View Roles':
          viewRoles();
          break;  

        case 'Add Employee':
          addEmployee();
          break;  

        case 'Add Departments':
          addDepartment();
          break;  

        case 'Add Roles':
          addRoles();
          break;
      }
      
    }); 
};
// function to view all Employees information
const viewAllEmployees = () =>{
const query = `SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, employee_dept.dept_name, employee_role.salary, CONCAT(manager.first_name,'', manager.last_name) AS manager
FROM employee 
LEFT JOIN employee manager ON manager.id = employee.manager_id
INNER JOIN employee_Role ON employee.role_id = employee_Role.id
INNER JOIN employee_Dept ON employee_Dept.id = employee_Role.department_id;`
connection.query(query, (err, res) =>{
  if (err) throw err
  console.log("View all employees")
  console.table(res)
  employeeUpdate()
})
};
// function to view all Departments
const viewDepartments = () => {
  const query = `SELECT dept_name FROM employee_Dept`
  connection.query(query, (err, res) => {
    if (err) throw err
    console.log('Viewing Departments')
    console.table(res)
    employeeUpdate()
  })
}
//  function to view all roles
const viewRoles = () => {
  const query = `SELECT title FROM employee_Role`
  connection.query(query, (err, res) => {
    if (err) throw err
    console.log('Viewing Roles')
    console.table(res)
  })
};
// function to add new employee
const addEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is employees first name?',
      name: 'firstName'
    },
    { 
      type: 'input',
      message: 'What is employees last name?',
      name: 'lastName'
    },
    {
      type: 'input',
      message: 'What is employees role id?',
      name: 'roleId'
    },
    {
      type: 'input',
      message: 'What is employees manager id?',
      name: 'managersId'
    }
  ]).then((answers)=>{
    connection.query(`INSERT INTO employee SET ?`,
    {
      first_name: answers.firstName,
      last_name: answers.lastName,
      role_id: answers.roleId,
      manager_id: answers.managersId
    },
    (err) => {
      if (err) throw err;
      console.log('Added employee')
      console.table(answers)
      employeeUpdate()
    })
  })
};
// function to add new department
const addDepartment = () =>{
  inquirer.prompt([
    {
      type: 'input',
      message: 'What department would you like to add?',
      name: 'newDept'
    }
  ]).then((answers) => {
    connection.query(`INSERT INTO employee_Dept SET ?`,
    {
      dept_name: answers.newDept
    },
    (err) => {
      if (err) throw err;
      console.log('Added new Department')
      console.table(answers)
      employeeUpdate()
    })
  })
};
// function to add roles
const addRoles = () =>{
  inquirer.prompt([
    {
      type: 'input',
      message: 'What role would you like to add?',
      name: 'newRole'
    },
    {
      type: 'input',
      message: 'What is the salary?',
      name: 'salary'
    }
  ]).then((answers)=> {
    connection.query(`INSERT INTO employee_Role SET ?`,
    {
      title: answers.newRole,
      salary: answers.salary
    },
    (err) => {
      if (err) throw err;
      console.log('Added new Role')
      console.table(answers)
      employeeUpdate()
    })
  })
}


employeeUpdate()
