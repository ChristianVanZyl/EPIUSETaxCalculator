import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import calcNet from "./functions.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// to use ejs views

app.set("view engine", "ejs");

// middleware for static files
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("Home", {
        buttonStatus: "disabled",
        ageSaved: "",
        incomeSaved: "",
        taxThreshold: "",
        taxRebate: "",
        yearlyBeforeRebate: "",
        taxTotal: "",
        paye: "",
        uifMax: "",
        uifPerc: "",
        uifMonthly: "",
        netMonthly: "",
        netYearly: "",
    }) 
});

// user posts age and income and the post request returns an object with all frontend tax related results, including paye

app.post('/', async (req, res) => {
    const {ageInput, incomeInput} = req.body;
    try {
        const resultObj =  await calcNet(ageInput,incomeInput);
        res.render("Home", {
            buttonStatus: "enabled",
            ageSaved: ageInput,
            incomeSaved: incomeInput,
            taxThreshold: resultObj.taxThreshold,
            taxRebate: resultObj.taxRebate,
            yearlyBeforeRebate: resultObj.yearlyBeforeRebate,
            taxTotal: resultObj.taxTotal,
            paye: resultObj.paye,
            uifMax: resultObj.uifMax,
            uifPerc: resultObj.uifPerc,
            uifMonthly: resultObj.uifMonthly,
            netMonthly: resultObj.netMonthly,
            netYearly: resultObj.netYearly  
        })  
    } catch (err) {
        return console.log(err.message);
    }
   
});

app.listen(PORT, function(){
    console.log(`Server running on port ${PORT}`)
})