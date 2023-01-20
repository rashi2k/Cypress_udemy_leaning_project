/// <reference types = "Cypress" />

 
describe('First Suit', () => {
  it('test case 1', () => {
    testMethod1();
    //insertModuleObject("Financial Statement Template", ['ddfd', "2343", "5678", "9076"]); 
  })
})


// How to use 
// Method 1 (calling async funtion)
async function testMethod1() {
  var newCode = await uniqueRandomCodeGenerator_(4, "Checklist Template");
  console.log("newCode", newCode);
}

// Method 2 (implement rest of the code with after promise resolve)
function testMethod2() {
  uniqueRandomCodeGenerator(4, "Financial Statement Template").then((newCode) => {
    console.log("newCode", newCode);
  });
}



//------------------------------- unique code generator implementation----------------------------------//

async function uniqueRandomCodeGenerator_(length, moduleName) {
  const tries = 15;  // if the code alredy exists, this will continue for 15 attemps.
  const exisitngCodes = await cy.readFile('cypress/fixtures/generated_codes.json');

  console.log("existing codes", exisitngCodes)

  for (var i = 0; i < tries; i++) {
    var newCode = randomAlphaNumberic(length);
    if (!(await isCodeExists(newCode, moduleName, exisitngCodes))) {
      return newCode;
    }
  }
}

export function randomAlphaNumberic(length) {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var result = "";

  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];

    const randomNo =  Math.floor(Math.random() * (3 - 1 + 1) + 1);
    console.log("randomeno",randomNo)
    if(randomNo === 1) {
        result = "AAAD";
    }else if(randomNo === 2){
        result = "CL43";
    }
  return  result;
}


async function isCodeExists(code, moduelName, exisitngCodes) {
  const filteredModuleObject = Object.keys(exisitngCodes)
    .filter(key => key === moduelName)
    .reduce((obj, key) => {
      obj[key] = exisitngCodes[key];
      return obj;
    }, {});

  console.log(filteredModuleObject)

  if (filteredModuleObject && Object.values(filteredModuleObject).length > 0) {
    const currentModuleCodesArray = Object.values(filteredModuleObject)[0];
    const moduleCodes = currentModuleCodesArray.filter(c => c === code);

    if (moduleCodes.length > 0) {
      console.log("code exists for the module : ", moduelName)
      return true;
    } else {
      // save to the file by adding current code
      console.log("code is not exists for the module. code :", code + " is adding it to the json")
      exisitngCodes[moduelName] = [...exisitngCodes[moduelName], code];
      cy.writeFile('cypress/fixtures/generated_codes.json', exisitngCodes)
      return false;
    }
  } else {
    //save to the json for New module
    console.log(moduelName, " is not exist. New module is adding it to the json")
    cy.writeFile('cypress/fixtures/generated_codes.json', { ...exisitngCodes, [moduelName]: [code] })
    return false;
  }
}



//---------------add new object to the generated_codes file -------//

function insertModuleObject(moduleName, array) {
  cy.readFile('cypress/fixtures/generated_codes.json').then((exisitngCodes) => {
    cy.writeFile('cypress/fixtures/generated_codes.json', { ...exisitngCodes, [moduleName]: array })
  })
}


//------------------------------- unique code generator implementation for LOLC workiing ----------------------------------//

export async function uniqueRandomCodeGenerator_lolc(length, moduleName) {
  const tries = 15; 
  var newc = await readFile().then((exisitngCodes) =>{
      console.log("2. exisitngCodes: ", exisitngCodes);

      return new Promise(async (resolve, reject) => {
          for (var i = 0; i < tries; i++) {
              var newCode = randomAlphaNumberic(length);
              if (!(await isCodeExists(newCode, moduleName, exisitngCodes))) {
                  console.log("3. new code: ", newCode);
                  resolve(newCode);
                  break;
              }
          }
      })
  })

  console.log("newc: ", newc);
  return newc;
}

function readFile() {
  return new Promise((resolve, reject) => {
      cy.readFile('cypress/fixtures/generated_codes.json').then(data => {
          console.log("1. data: ", data);
          resolve(data)
      })
  })
}


//usage
When('Test', () => {
  uniqueRandomCodeGenerator_lolc(4, moduleName).then((newCode) => {
      console.log("Final New Code:", newCode);
      //assert here
  });
})


