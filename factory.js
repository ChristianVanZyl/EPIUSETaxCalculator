// import annualizationStep from "./commands/annualizationStep.js";
// import calculateStep from "./commands/calculateStep.js";
// import capStep from "./commands/capStep.js";
// import inputStep from "./commands/inputStep.js";
// import lookupTableStep from "./commands/lookupTableStep.js";
// import setConstant from "./commands/setConstant.js";
// import Command from "./commands/command.js";

// export default class Factory {
//     constructor() {
//     }

//     createCommand (commandType, ...args) {          
//         var command;
//         switch (commandType) {
//             case "annualize":
            
//                 command = new Command(annualizationStep(income, payCycle));
//                 break;
//             case "calculate":
                
//                 command = new Command(calculateStep(firstValue, operator, secondValue, outputResultName));
//                 break;
//             case "cap":
//                 command = new Command(capStep(values));
//                 break;
//             case "input":
//                 command = new Command(inputStep(values));
//                 break;
//             case "lookup":
//                 command = new Command(lookupTableStep(values));
//                 break;
//             case "setConstant":
//                 command = new Command(setConstant(values));
//                 break;
//         }

//         return command;
// }
// }


