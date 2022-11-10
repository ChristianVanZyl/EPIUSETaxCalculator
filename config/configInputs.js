import jsonLoader from "../jsonLoader.js"

export default function configInputs(){
    let obj = jsonLoader("configInputs.json")
   
    let map = new Map(Object.entries(obj))

  
    return map;
}