// packages to run app
const inquirer = require('inquirer')
const fs = require('fs')
const mysql = require('mysql')
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
                      'Update Empoyee Role',
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
  const query = `SELECT * FROM employee_Dept`
  connection.query(query, (err, res) => {
    if (err) throw err
    console.log('Viewing Departments')
    console.table(res)
    employeeUpdate()
  })
}
//  function to view all roles
const viewRoles = () => {
  const query = `SELECT * FROM employee_Role`
  connection.query(query, (err, res) => {
    if (err) throw err
    console.log('Viewing Roles')
    console.table(res)
  })
}
employeeUpdate()
