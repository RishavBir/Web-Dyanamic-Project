
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const mongoose = require("mongoose")
const path = require("path")
const hbs = require("hbs")
const Contact = require("./Model/ContactSchema.js")

////////////////////////////////////////////////////////////////

//setting path
const staticPath = path.join(__dirname,"../public")
const staticPath11 = path.join(__dirname,"../node_modules/bootstrap/dist/css")
const staticPath12 = path.join(__dirname,"../node_modules/bootstrap/dist/js")
const staticPath13 = path.join(__dirname,"../node_modules/jquery/dist")
const templatesPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")

////////////////////////////////////////////////////////////////////////////////////


//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(staticPath))
app.use("/css",express.static(staticPath11))
app.use("/js",express.static(staticPath12))
app.use("/jq",express.static(staticPath13)) 
app.set("view engine", "hbs")
app.set("views", templatesPath)
hbs.registerPartials(partialsPath)


//////////////////////////////////////////////////////////////////////////////////


// database connection
mongoose.connect("mongodb+srv://pattamu:iKHwECgQCaYNVpge@sandeepcluster.9rzkh.mongodb.net/rishav305?retryWrites=true&w=majority", {
    useNewUrlParser: true
})

    .then(() => {
        console.log("MongoDb is connected")
    })
    .catch((err) => {
        console.log(err)
    })


////////////////////////////////////////////////////////////////////////////////


// routing for index
app.get("/", (req, res) => {
    res.render("index.hbs")
})
// routing for contact
app.get("/contact", (req, res) => {
    res.render("contact")
})
//routing for photos
app.get("/photos", (req, res) => {
    res.render("photos")
})
//routing for courses
app.get("/course",(req,res)=>{
res.render("course")
})
//routing for about
app.get("/about", (req, res) => {
    res.render("about")
})
//routing for service
app.get("/service", (req, res) => {
    res.render("service")
})
//posting to mongodb
app.post("/contact",async (req,res)=>{
try{
    let data = req.body
    const candidateData = new Contact(data)
    await candidateData.save()
    res.status(201).render("index")
}
catch(err){
    res.status(500).send(err)
}
})

/////////////////////////////////////////////////////////////////////////////////


// creating server
app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port' + (process.env.PORT || 3000))
});