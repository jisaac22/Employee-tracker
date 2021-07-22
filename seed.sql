-- place holder for employees 

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, 3), ('Mike', 'Chan', 2, 1), ('Ashley', 'Rodriguez', 3, 0), ('Kevin', 'Tupik', 4, 3), ('Malia', 'Brown', 5, 0), ('Sarah', 'Lourd', 6, 0), ('Tom', 'Allen', 7, 6), ('Christian', 'Eckenrode', 3, 2);

INSERT INTO employee_Role(title, salary, department_id)
VALUES ('Sales lead', 100000, 1), ('Sales person', 80000, 1), ('Lead engineer', 150000, 2), ('Software engineer', 120000, 2), ('Accountant', 125000, 3), ('Legal team lead', 250000, 4), ('Lawyer', 190000, 4);

INSERT INTO employee_Dept(dept_name)
VALUES ('Sales'), ('Engineering'), ('Finance'), ('Legal');

-- Left join and inner joins to create view all table 
SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, employee_dept.dept_name, employee_role.salary, CONCAT(manager.first_name,'', manager.last_name) AS manager
FROM employee 
LEFT JOIN employee manager ON manager.id = employee.manager_id
INNER JOIN employee_Role ON employee.role_id = employee_Role.id
INNER JOIN employee_Dept ON employee_Dept.id = employee_Role.department_id