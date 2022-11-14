import express from "express";
import dotenv from "dotenv";
import { PayrollMain } from "./payrollMain.js"
import stepsLoader from "./stepsLoader.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT;




// three ways of implementation that could work
// only one way that would justify the use of ejs, otherwise switch to index.html and script



// create script within index.html, use function/class directly
// create dynamic html in script function
// this would defeat the purpose of using ejs, which simplifies the process by cutting out the need for function creating dynamic html 


// create payroll main function, call here to be used
// follow same logic as in class, but can then call stepsloader in the function
// async function


// logic followed here by using payroll main class
// use init for async loading




// can cut out global variables, but would need to then initialize in both get and post
const steps = stepsLoader();
const payroll = new PayrollMain(steps, new Map);

app.set("view engine", "ejs");
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"));


app.get("/", function(req, res){
    
    res.render("Home", {inputs: payroll.getInputs(),
                        outputs: [],
                        tableDisplay: "false"}) 
});

app.post('/', (req, res) => {
    
    const vals = req.body;
    payroll.getValues(vals)
    payroll.execute()
  
    
    res.render("Home", {
                        inputs:  payroll.getInputs(),
                        outputs: payroll.getOutputs(),
                        tableDisplay: "true"}
                        ) 
});



app.listen(PORT, function(){
    console.log(`Server running on port ${PORT}`)

})



