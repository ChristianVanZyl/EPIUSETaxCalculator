import express from "express";
import dotenv from "dotenv";
import { PayrollMain } from "./payrollMain.js"
import stepsLoader from "./stepsLoader.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT;


//async not yet implemented, read up about it, did not yet have the time

// can cut out global variables, but would need to then initialize in both get and post
// stepsloader needs 
const steps = stepsLoader();
const payroll = new PayrollMain(steps, new Map());

app.set("view engine", "ejs");
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));


app.get("/", function (req, res) {
   
    res.render("Home", {
        inputs: payroll.getInputs(),
        outputs: [],
        tableDisplay: "false"
    })
});

app.post('/', (req, res) => {

    const valuesObj = req.body;
    payroll.setValues(valuesObj)
    payroll.execute()
  
    res.render("Home", {
        inputs: payroll.getInputs(),
        outputs: payroll.getOutputs(),
        tableDisplay: "true"
    }
    )
});



app.listen(PORT, function () {
    console.log(`Server running on port ${PORT}`)

})



