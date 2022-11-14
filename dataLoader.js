import fs from "fs";


// this needs to be an async function, to be changed later

export default function dataLoader(filename){


    let data = fs.readFileSync(filename)
    data=  JSON.parse(data)
    return ((data))
   
   

};
  


