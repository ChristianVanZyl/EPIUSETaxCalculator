import express from "express";
import dotenv from "dotenv";
import processPayRollData from "./processComposite.js"


dotenv.config();
const app = express();
const PORT = process.env.PORT;


// to use ejs views

app.set("view engine", "ejs");

// middleware for static files
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"));

app.get("/", function(req, res){
    const map = new Map();
    const ioArray = processPayRollData(map)

    res.render("Home", {inputs: ioArray[0],
                        outputs: ioArray[1],
                        tableDisplay: "false"}
                        ) 
});



app.post('/', (req, res) => {
    const inputs = (req.body)
    const map = new Map(Object.entries(inputs));
    
    const ioArray = processPayRollData(map)

    console.log(ioArray)
    res.render("Home", {inputs: ioArray[0],
                        outputs: ioArray[1],
                        tableDisplay: "true"}
                        ) 
});

app.listen(PORT, function(){
    console.log(`Server running on port ${PORT}`)
  
  
})



