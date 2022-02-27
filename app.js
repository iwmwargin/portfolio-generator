const inquirer = require('inquirer');
// const fs = require('fs');
// const generatePage = require("./src/page-template.js");

// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw new Error(err);

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });

const promptUser = () => {
return inquirer.prompt([ 
    {
        type: "input",
        name: "name",
        message: "What is your name? (Required)",
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log("Please enter your name!");
                return false;
            }
        }
    },
    {
        type: "input",
        name: "github",
        message: "Enter your Github Username (Required)",
        validate: githubName => {
            if (githubName) {
                return true;
            } else {
                console.log("Please enter your Github username!");
                return false;
            }
        }
    },
    {
        type: "input",
        name: "about",
        message: "Provide some information about yourself: (Required)",
        validate: about => {
            if (about) {
                return true;
            } else {
                console.log("Please tell us about yourself!");
                return false;
            }
        }
    }
  ]);
};

const promptProject = portfolioData => {
    console.log(`
    ==================
    Add a New Project
    ==================
    `);
    if (!portfolioData.projects) { 
        portfolioData.projects = [];
    }
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of your project? (Required)",
            validate: projectName => {
                if (projectName) {
                    return true;
                } else {
                    console.log("Please enter your project name!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "description",
            message: "Provide a description of the project (Required)",
            validate: projectDesc => {
                if (projectDesc) {
                    return true;
                } else {
                    console.log("Please describe your project!");
                    return false;
                }
            }
        },
        {
            type: "checkbox",
            name: "languages",
            message: "What did you build this project with? (Check all that apply)",
            choices: ["JavaScript", "HTML", "CSS", "ES6", "jQuery", "Bootstrap", "Node"]
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: link => {
                if (link) {
                    return true;
                } else {
                    console.log("Please provide a link to your project!");
                    return false;
                }
            }
          },
          {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
          },
          {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
          }  
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    });
};

promptUser()
.then(promptProject)
.then(portfolioData =>{ console.log(portfolioData);
});