INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, 3), ('Mike', 'Chan', 2, 1), ('Ashley', 'Rodriguez', 3), ('Kevin', 'Tupik', 4, 3), ('Malia', 'Brown', 5), ('Sarah', 'Lourd', 6), ('Tom', 'Allen', 7, 7), ('Christian', 'Eckenrode', 3, 2);

INSERT INTO employee_Role(title, salary, department_id)
VALUES ('Sales lead', 100000, 1), ('Sales person', 80000, 1), ('Lead engineer', 150000, 2), ('Software engineer', 120000, 2), ('Accountant', 125000, 3), ('Legal team lead', 250000, 4), ('Lawyer', 190000, 4);

INSERT INTO employee_Department(department_name)
VALUES ('Sales'), ('Engineering'), ('Finance'), ('Legal');