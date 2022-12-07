import express from "express";
import dotenv from "dotenv";
import functionMain from "./functionMain.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const payroll = await functionMain();

app.set("view engine", "ejs");
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));

// new function, contains async init 
// factory returns init 

app.get("/", (req, res) => {
  
    res.render("Home", {
        inputs: payroll.getInputs(),
        outputs: [],
        tableDisplay: "false",
        map: payroll.map
    })
});

app.post('/', (req, res) => {
    
    const valuesObj = req.body;
    payroll.setValues(valuesObj)
    payroll.execute()
  
    res.render("Home", {
        inputs: payroll.getInputs(),
        outputs: payroll.getOutputs(),
        tableDisplay: "true",
        map: payroll.map
    }
    )
});



app.listen(PORT, () =>  {

    console.log(`Server running on port ${PORT}`)
})



