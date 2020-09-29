const {
  Manager
} = require("./lib/Manager");
const {
  Engineer
} = require("./lib/Engineer");
const {
  Intern
} = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const {
  Employee
} = require("./lib/Manager");

let employeesArray = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)


function enrollPrompt() {
  inquirer
    .prompt({
      type: 'list',
      name: 'employees',
      message: 'Which ?',
      choices: ['Engineer', 'Intern', 'Manager'],
    }).then((answers) => {
      if (answers.employees === 'Engineer') {
        console.log('Welcome new Engineer!');
        engineerInfo();
      } else if (answers.employees === 'Intern') {
        console.log('Welcome new Intern!');
        internInfo();
      } else {
        console.log('Welcome new Manager!');
        managerInfo();
      }
    });
};

function engineerInfo() {
  inquirer
    .prompt([{
        type: 'input',
        message: 'What is Your name?',
        name: 'name'
      }, {
        type: 'input',
        message: 'What is Your ID number?',
        name: 'id'
      }, {
        type: 'input',
        message: 'What is Your Email?',
        name: 'email'
      }, {
        type: 'input',
        message: 'What is Your GitHub username?',
        name: 'github'
      },
      {
        type: "checkbox",
        message: "Enroll another Employee?",
        name: "enroll",
        choices: [
          "yes",
          "no"
        ]
      }
    ])

    .then((response) => {

      const e = new Engineer(response.name, response.id, response.email, response.github);
      console.log(e)

      employeesArray.push(e);

      if (response.enroll == "yes") {
        return enrollPrompt()
      } else {
        try {
          console.log('Team Assembled!')
          console.log(render(employeesArray));
        } catch (err) {
          console.log(err)
        }


      }
    });

};

function internInfo() {
  inquirer
    .prompt([{
        type: 'input',
        message: 'What is Your name?',
        name: 'name'
      }, {
        type: 'input',
        message: 'What is Your ID number?',
        name: 'id'
      }, {
        type: 'input',
        message: 'What is Your Email?',
        name: 'email'
      }, {
        type: 'input',
        message: 'Where do you attend school?',
        name: 'school'
      },
      {
        type: "checkbox",
        message: "Enroll another Employee?",
        name: "enroll",
        choices: [
          "yes",
          "no"
        ]
      }
    ])

    .then((response) => {

      const e = new Intern(response.name, response.id, response.email, response.school);
      console.log(e)

      employeesArray.push(e);
      if (response.enroll == "yes") {
        return enrollPrompt()
      } else {
        try {
          console.log('Team Assembled!')
          render(employeesArray)
        } catch (err) {
          console.log(err)
        }


      }
    });

};

function managerInfo() {
  inquirer
    .prompt([{
        type: 'input',
        message: 'What is Your name?',
        name: 'name'
      }, {
        type: 'input',
        message: 'What is Your ID number?',
        name: 'id'
      }, {
        type: 'input',
        message: 'What is Your Email?',
        name: 'email'
      }, {
        type: 'input',
        message: 'What is your office number?',
        name: 'office'
      },
      {
        type: "checkbox",
        message: "Enroll another Employee?",
        name: "enroll",
        choices: [
          "yes",
          "no"
        ]
      }
    ])

    .then((response) => {

      const e = new Manager(response.name, response.id, response.email, response.office);
      console.log(e)

      employeesArray.push(e);
      if (response.enroll == "yes") {
        return enrollPrompt()
      } else {
        try {
          console.log('Team Assembled!')
          render(employeesArray)
        } catch (err) {
          console.log(err)
        }


      }
    });
};

enrollPrompt()


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```