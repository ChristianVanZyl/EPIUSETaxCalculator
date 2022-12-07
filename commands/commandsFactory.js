import { AnnualizationStep } from "./annualizationStep";
import { CalculateStep } from "./calculateStep";
import { CapStep } from "./capStep";
import { InputStep } from "./inputStep";
import { LoadTableStep } from "./loadTableStep";
import { LookupTableStep } from "./lookupTableStep";
import { OutputStep } from "./outputStep";
import { SetConstantStep } from "./setConstantStep";
import { Factory } from "../factory/factory";

export default function commandsFactory(){
    let commandsArr = [
        AnnualizationStep,
        CalculateStep,
        CapStep,
        InputStep,
        LoadTableStep,
        LookupTableStep,
        OutputStep,
        SetConstantStep
    ];
    
    const factory = new Factory();
    
    commandsArr.forEach(c => {
        factory.addToClassCatalogue(c.name, c)
    });

    return factory
}