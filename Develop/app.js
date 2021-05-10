const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamArray = [];
// Base Questions to keep Dry
const baseQuestions = [{
        type: 'input',
        name: 'name',
        message: "Enter the employee\'s: name: ",
    },

    {
        type: 'input',
        name: 'id',
        message: "Enter the employee\'s: id: ",
    },

    {
        type: 'input',
        name: 'email',
        message: "Enter the employee\'s email: ",
    }
];
// Manager Questions
const managerQuestions = [
    ...baseQuestions,
    {
        type: 'input',
        name: 'officeNumber',
        message: "Enter the office number: ",
    },
];
// Intern Questions
const internQuestions = [
    ...baseQuestions,
    {
        type: 'input',
        name: 'school',
        message: 'Enter education location: ',
    },
];
// Engineer Questions
const engineerQuestions = [
    ...baseQuestions,
    {
        type: 'input',
        name: 'github',
        message: 'Enter GitHub username:',
    },
];
// Hiring a manager
inquirer.prompt(managerQuestions)
    .then((response) => {
        const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
        teamArray.push(manager);
        determineEmployee();
    });
//Determine Employee to Hire
function determineEmployee() {
    const employeeQuestions = [{
        name: 'choice',
        type: 'list',
        message: 'Which position is being filled: ',
        choices: ['Intern', 'Engineer', 'Done'],
    }, ];
    inquirer.prompt(employeeQuestions)
        .then((answers) => {
            if (answers.choice === 'Intern') {
                internInfo();
            }
            if (answers.choice === 'Engineer') {
                engineerInfo();
            }
            if (answers.choice === 'Done') {
                createHTMLFile();
            }
        })
}
//Create Intern for Team
function internInfo() {
    inquirer.prompt(internQuestions)
        .then((response) => {
            const intern = new Intern(response.name, response.id, response.email, response.school);
            teamArray.push(intern);
            determineEmployee();
        })
}
//Create Engineer for Team
function engineerInfo() {
    inquirer.prompt(engineerQuestions)
        .then((response) => {
            const engineer = new Engineer(response.name, response.id, response.email, response.github);
            teamArray.push(engineer);
            determineEmployee();
        })
}

function createHTMLFile() {
    // write the html file from the team array
    try {
        const html = render(teamArray);
        // create the file using fs library
        fs.writeFileSync(outputPath, html);
    } catch (error) {
        console.log(error);
    }
}

//init();
