/*
The application should have an input form that collects _employee first name, last name, ID number, job title, annual salary_. ***DONE***
A 'Submit' button should collect the form information, store the information to calculate monthly costs, append information to the DOM and clear the input fields. 
Using the stored information, calculate monthly costs and append this to the to DOM. If the total monthly cost exceeds $20,000, add a red background color to the total monthly cost.
Create a delete button that removes an employee from the DOM. For Base mode, it does **not** need to remove that Employee's salary from the reported total.
*/


/*
I'm going to write a program that will take the input from the DOM for an EMPLOYEES FIRST NAME, LAST NAME, ID NUMBER, JOB TITLE, AND ANNUAL SALARY.
    from DOM --> JavaScript
After this, there will be a SUBMIT button that will take in and save the information. 
    Need constant variables for information (except maybe salary???)
Then, we will take that to calculate monthly costs, send that information back to the DOM
    From Javascript, we will push to DOM the employees information.
Finally, we will need a DELETE BUTTON that removes the employee from the list on the DOM. 
    **REGULAR GOAL** the employee will be removed as well as their information (expect for that employees salary from the total)

*/



/*

Now I need to create a button that will submit the information entered. Then, append to DOM

    First is the button, which will be called SUBMIT INFORMATION.
        This will take our input information, and assign it to the object employee that we have
        
    Append to DOM
        For now, we can just use an UNORDERED LIST that will append the input information to the UL called employeeInformationOut.

    Now, we need to clear the input fields.
        Create a new function called EMPTY INPUTS
            When this function is called, it will set the values of our inputs to .val('')
        
        We actually don't need a new button to clear inputs, since we can just call this within our InfoIn function

    We can probably pop this sucker at the end of the function employeeInformationIn).

*/

// Lets go
$(document).ready( onReady );

let totalReportedSalary = 0;
let employees = [];
let budget = 1000.00;

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

function onReady(){
    // I need an onClick line for the button submitEmployeeInformation that, on a click, will run the function employeeInformationIn 
    $('#addEmployee').on('click', addEmployee);
}

// This function is called when the "Add Employee button is clicked"
function addEmployee(){
    const employee = {
        firstName: $('#employeeFirstName').val(),
        lastName: $('#employeeLastName').val(),
        id: $('#employeeIDNumber').val(),
        jobTitle: $('#employeeJobTitle').val(),
        salary: parseFloat($('#employeeSalary').val()),
    }

    // Make sure all fields are filled in
    if ((employee.firstName != '') && (employee.lastName != '') && (employee.id != '') && (employee.jobTitle != '') && (employee.salary != '')){
    } else {
        alert ('Missing Employee Information!');
        return;
    }

    // Add employee to list of employees
    employees.push(employee);

    addRowToTable(employee);

    updateTotalCosts();

    emptyInputs();
    console.log(employees)
}

function emptyInputs(){
    $('#employeeFirstName').val('');
    $('#employeeLastName').val('');
    $('#employeeIDNumber').val('');
    $('#employeeJobTitle').val('');
    $('#employeeSalary').val('');
}

function addRowToTable(employee) {
    const employeeTable = $('#employeeInformationOut');
    // Create our number formatter.
  
    let employeeRow = $(document.createElement("tr"));
    let btn = $(document.createElement("button"));
    btn.text("Delete Employee");
    btn.data('id', employee.id);
    btn.click(deleteButtonWasClicked);

    employeeRow.append(`<td>${employee.firstName}</td>`);
    employeeRow.append(`<td>${employee.lastName}</td>`);
    employeeRow.append(`<td>${employee.id}</td>`);
    employeeRow.append(`<td>${employee.jobTitle}</td>`);
    employeeRow.append(`<td>${formatter.format(employee.salary)}</td>`);

    let tdAroundButton = $(document.createElement("td"));
    tdAroundButton.append(btn)
    employeeRow.append(tdAroundButton);
    
    employeeTable.append(employeeRow);
}

function deleteButtonWasClicked(event) {
    // $(event.currentTarget) is the button that was clicked
    const deleteButtonThatWasClicked = $(event.currentTarget);
    const employeeIdToDelete = deleteButtonThatWasClicked.data('id');
    // filtering the employees array and saying (for employee of employees) => return the employees that are NOT EQUAL to the ID we want to delete
    // need to set array = to itself so that it will update the variable globaly
    employees = employees.filter(employee => employee.id != employeeIdToDelete);
    // 2. Clear the employee table
    updateTotalCosts();
    $('#employeeInformationOut').empty();
    // 3. Loop over employees array and add a table row for each employee left in employees array
    for (const employee of employees){
        // call function to add rows and pass employee thru it to display objects in array
        addRowToTable(employee);
    }

    console.log(employees);
}

// Need a function that will add all values of the employees array and calculate if it exceeds the monthly cost
function updateTotalCosts(){
    // For loop that will add all values of employee.salary
    let totalCostHeading = $('#totalCost');
    let totalCost = 0;
    for (const employee of employees){
       totalCost = totalCost + employee.salary;
    }
    if (totalCost < 100000){
        underBudget();
    } else {
        overBudget();
        alert('You just went over the budget');
    }
    totalCostHeading.text('Total Cost of Employees: ' + formatter.format(totalCost));
}
    // let overUnder = document.getElementById('totalCost');
function overBudget(){
    let over = document.getElementById('totalCost');
    over.className = 'overBudget';
}

function underBudget(){
    let under = document.getElementById('totalCost');
    under.className = 'underBudget';
}
// On delete button press, I want to remove ONLY this employees cost from the rest
// I would target the salary data of THIS employee similar to targeting them from deletion
// After getting the salary data, I would run a function to subtract that from total, then redisplay it
    // Maybe even an alert saying "new monthly cost is..."



/*


MONTHLY COST CALCULATION
    IF the total monthly cost that is calculated is GREATER THAN $20,000, we will add a red background color to the TOTAL MONTHLY COST.
    IF the total monthly cost that is calculated is LESS THAN $20,000, we will add a GREEN background color to the TOTAL MONTHLY COST.

*/


/*


class Person {
    constructor(fName, lName) {
        this.firstName = fName;
        this.lastName = lName;
    }

    function name() {
        return `${this.firstName} ${this.astName}`
    }

    function makeDinner(food) {
        console.log(`Yummmm. That ${food} was delicious!`);
    }
}

const harrison = Person('Harrison', 'Browning')
harrison.makeDinner('fish');

*/