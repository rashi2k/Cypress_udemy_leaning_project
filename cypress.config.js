const { defineConfig } = require("cypress");
//const fs = require('fs')
const {uniqueRandomCodeGeneratorTask} = require("./cypress/e2e/code_generator");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        // uniqueRandomCodeGenerator(moduelName, length) {
        //   return new Promise((resolve, reject) => {
        //     fs.readFile('cypress/fixtures/generated_codes.json', (err, data) => {
        //       if (err) {
        //         return reject(err)
        //       }

        //       const exisitngCodes = JSON.parse(data);
        //       var code = "";
        //       const chars =
        //         "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        //       for (var i = length; i > 0; --i)
        //         code += chars[Math.floor(Math.random() * chars.length)];

        //       // THIS CODE FOR TEST EXISTING CODES FUNCTIONALITY
        //       //const randomNo = Math.floor(Math.random() * (3 - 1 + 1) + 1);
            
        //       // if (randomNo === 1) {
        //       //   code = "CWrA";
        //       // } else if (randomNo === 2) {
        //       //   code = "z66N";
        //       // }
        //       // code = "z66N";

        //       const filteredModuleObject = Object.keys(exisitngCodes)
        //         .filter(key => key === moduelName)
        //         .reduce((obj, key) => {
        //           obj[key] = exisitngCodes[key];
        //           return obj;
        //         }, {});

        //       console.log("filteredModuleObject", filteredModuleObject)

        //       if (filteredModuleObject && Object.values(filteredModuleObject).length > 0) {
        //         const currentModuleCodesArray = Object.values(filteredModuleObject)[0];
        //         const moduleCodes = currentModuleCodesArray.filter(c => c === code);

        //         if (moduleCodes.length > 0) {
        //           console.log("code exists for the module : ", moduelName)
        //           resolve(null);
        //         } else {
        //           // save to the file by adding current code
        //           console.log("code is not exists for the module. code :", code + " is adding it to the json")
        //           exisitngCodes[moduelName] = [...exisitngCodes[moduelName], code];
        //           fs.writeFileSync("cypress/fixtures/generated_codes.json", JSON.stringify(exisitngCodes));
        //           resolve(code)
        //         }
        //       } else {
        //         //save to the json for New module
        //         console.log(moduelName, " is not exist. New module is adding it to the json")
        //         fs.writeFileSync("cypress/fixtures/generated_codes.json", JSON.stringify({ ...exisitngCodes, [moduelName]: [code] }));
        //         //cy.writeFile('cypress/fixtures/generated_codes.json', { ...exisitngCodes, [moduelName]: [code] })
        //         resolve(code)
        //       }
        //     })
        //   })
        // }
        uniqueRandomCodeGeneratorTask,
      })
    },
    downloadsFolder: "cypress/downloads",
    defaultCommandTimeout: 8000
  },
});
