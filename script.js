        'use strict';
        
        // Employee class to represent an employee
        class Employee {
            constructor(name, address, employeeId, designation) {
                this.name = name;
                this.address = address;
                this.employeeId = employeeId;
                this.designation = designation;
            }
        }

        // Array to store employee objects
        let employees = [];

        // regex funtion to check if string conatins only spaces.
        function containsOnlySpaces(input) {
            // Regular expression to match a string containing only spaces
            var regex = /^\s*$/;
        
            // Test if the input contains only spaces
            return regex.test(input);
        }
        

        // Function to add an employee
        function addEmployee() {
            const name = document.getElementById('name').value;
            const address = document.getElementById('address').value;
            const employeeId = document.getElementById('employeeId').value;
            const designation = document.getElementById('designation').value;

            // Check if employee already exists (based on employee ID)
            const existingEmployeeIndex = employees.findIndex(emp => emp.employeeId === employeeId);

            if (existingEmployeeIndex !== -1) {
                // Update existing employee
                employees[existingEmployeeIndex].name = name;
                employees[existingEmployeeIndex].address = address;
                employees[existingEmployeeIndex].designation = designation;
            } else {
                // Add new employee
                if(!containsOnlySpaces(name) && !containsOnlySpaces(employeeId)){
                const newEmployee = new Employee(name, address, employeeId, designation);
                employees.push(newEmployee);
                }
            }

            // Clear input fields
            document.getElementById('name').value = '';
            document.getElementById('address').value = '';
            document.getElementById('employeeId').value = '';
            document.getElementById('designation').value = '';

            displayEmployees();
        }

        // Function to display all employees
        function displayEmployees() {
            const employeeList = document.getElementById('employeeList');
            employeeList.innerHTML = ''; // Clear previous list

            employees.forEach(employee => {
                const div = document.createElement('div');
                const employeeDetails=`
                 <h3>${employee.name}</h3>
                 <ul>
                 <li>Address: ${employee.address}</li>
                 <li>Employee ID: ${employee.employeeId}</li>
                 <li>Designation: ${employee.designation}</li>
                 </ul>    
                `;
                div.innerHTML=employeeDetails;

                // adding employeeDetails to the page
                employeeList.appendChild(div);

                // creating edit button to insert into dom of editemployeeform.
                const redBtn=document.createElement('li');
                redBtn.className='edit-btn-container';
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.className = 'edit-button';
                editButton.onclick = () => showEditForm(employee);
                redBtn.append(editButton);
                employeeList.appendChild(redBtn);
               
            });
        }

        // Function to populate edit form with employee details
        function showEditForm(employee) {
            console.log(employee);
            document.getElementById('editName').value = employee.name;
            document.getElementById('editAddress').value = employee.address;
            document.getElementById('editEmployeeId').value = employee.employeeId;
            document.getElementById('editDesignation').value = employee.designation;

            // Show edit form and hide employee list and employee form
            document.getElementById('editEmployeeForm').style.display = 'block';
            document.getElementById('viewEmployees').style.display = 'none';
            document.getElementById('employeeForm').style.display = 'none';
        }

        // Function to update employee details
        function updateEmployee() {
            const employeeId = document.getElementById('editEmployeeId').value;
            const name = document.getElementById('editName').value;
            const address = document.getElementById('editAddress').value;
            const designation = document.getElementById('editDesignation').value;

            // Find the employee by ID and update details
            const employee = employees.find(emp => emp.employeeId === employeeId);
            if (employee) {
                employee.name = name;
                employee.address = address;
                employee.designation = designation;
            }

            // Hide edit form and display employee list and employeeform again
            document.getElementById('editEmployeeForm').style.display = 'none';
            document.getElementById('viewEmployees').style.display = 'block';
            document.getElementById('employeeForm').style.display = 'block';

            // Re-display updated employee list
            displayEmployees();
        }

        // Initial display of employees
        displayEmployees();