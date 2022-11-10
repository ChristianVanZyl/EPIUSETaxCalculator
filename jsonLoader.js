import fs from "fs";


export default function jsonLoader(filename){
   
    return  JSON.parse(fs.readFileSync(filename))
    

    
}