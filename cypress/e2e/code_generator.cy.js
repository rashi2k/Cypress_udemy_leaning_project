/// <reference types = "Cypress" />

describe('First Suit', () => {
  it('test case 1', () => {
    testMethod1();
  })
})


// How to use 
// Method 1 (calling async funtion)
async function testMethod1() {
  var newCode = await uniqueRandomCodeGenerator(4, "Financial Statement Template");
  console.log("newCode", newCode);
}

// Method 2 (implement rest of the code with after promise resolve)
function testMethod2() {
  uniqueRandomCodeGenerator(4, "Financial Statement Template").then((newCode) => {
    console.log("newCode", newCode);
  });
}



//------------------------------- unique code generator implementation----------------------------------//

function randomAlphaNumberic(length) {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var result = "";

  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];

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

async function uniqueRandomCodeGenerator(length, moduleName) {
  const exisitngCodes = await cy.readFile('cypress/fixtures/generated_codes.json').then((data) => {
    return data;
  })

  for (var i = 0; i < 15; i++) {
    var newCode = randomAlphaNumberic(length);
    if (!(await isCodeExists(newCode, moduleName, exisitngCodes))) {
      return newCode;
    }
  }
}







