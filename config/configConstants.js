import jsonLoader from "../jsonLoader.js"

export default function configConst(){
    let obj = jsonLoader("configConstants.json")
   
    let map = new Map(Object.entries(obj))

  
    return map;
}