const fs = require('fs')
const GENERATED_CODES_File_PATH = "cypress/fixtures/generated_codes.json";
function uniqueRandomCodeGeneratorTask(obj) {
  
  const moduleName = obj.moduleName;
  const length = obj.codeLength
 
  return new Promise((resolve, reject) => {
    fs.readFile(GENERATED_CODES_File_PATH, (err, data) => {
      if (err) {
        return reject(err)
      }

      const exisitngCodes = JSON.parse(data);
      //console.log("exisitngCodes", exisitngCodes)
      var code = "";
      const chars =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (var i = length; i > 0; --i) {
      
        code += chars[Math.floor(Math.random() * chars.length)];
        console.log(code)
      }
      // THIS CODE FOR TEST EXISTING CODES FUNCTIONALITY
      //const randomNo = Math.floor(Math.random() * (3 - 1 + 1) + 1);

      // if (randomNo === 1) {
      //   code = "CWrA";
      // } else if (randomNo === 2) {
      //   code = "z66N";
      // }
      // code = "z66N";

      const filteredModuleObject = Object.keys(exisitngCodes)
        .filter(key => key === moduleName)
        .reduce((obj, key) => {
          obj[key] = exisitngCodes[key];
          return obj;
        }, {});

      console.log("filteredModuleObject", filteredModuleObject)

      if (filteredModuleObject && Object.values(filteredModuleObject).length > 0) {
        const currentModuleCodesArray = Object.values(filteredModuleObject)[0];
        const moduleCodes = currentModuleCodesArray.filter(c => c === code);

        if (moduleCodes.length > 0) {
          console.log("code exists for the module : ", moduleName)
          resolve(null);
        } else {
          // save to the file by adding current code
          console.log("code is not exists for the module. code :", code + " is adding it to the json")
          exisitngCodes[moduleName] = [...exisitngCodes[moduleName], code];
          fs.writeFileSync(GENERATED_CODES_File_PATH, JSON.stringify(exisitngCodes));
          resolve(code)
        }
      } else {
        //save to the json for New module
        console.log(moduleName, " is not exist. New module is adding it to the json")
        fs.writeFileSync(GENERATED_CODES_File_PATH, JSON.stringify({ ...exisitngCodes, [moduleName]: [code] }));
        //cy.writeFile('cypress/fixtures/generated_codes.json', { ...exisitngCodes, [moduleName]: [code] })
        resolve(code)
      }
    })
  })
}

module.exports = { uniqueRandomCodeGeneratorTask };