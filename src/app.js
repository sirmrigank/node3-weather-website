const express = require("express");
const path = require("path");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const hbs = require("hbs");

const app = express();

const staticFilePath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partial");

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(staticFilePath));

// app.get('',(req,res) => {
//     res.send("Hey there!");
// })

app.get("", (req, res) => {
  res.render("index", {
    title: "weather app",
    msg: "hey there!",
    name: "Mrigank Kumar"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Photo",
    name: "SilverPush Technology"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    name: "Mrigank"
  });
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You should provide a search term"
    });
  }
  res.send({
    product: []
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You should provide address term"
    });
  }
  
  geocode(req.query.address, (error,{lat,long,location} = {}) =>{
      if(error){
          return res.send({error})
      }
      forecast(lat,long ,(error,{temp,posibility}) => {
          if(error){
              return res.send({error});
          }
          res.send({
            temp: temp,
            possibility: posibility,
            location,
            address: req.query.address
          });
      })
  })

});

app.get("/help/*", (req, res) => {
  res.render("404-error", {
    title: "404",
    name: "kumar",
    errorMessage: "HepArticle not found"
  });
});

app.get("*", (req, res) => {
  res.render("404-error", {
    title: "404",
    name: "kumar",
    errorMessage: "Page not found"
  });
});

// app.get("/help" , (req,res) => {
//     res.send("This is help page")
// })

// app.get("/about", (req,res) => {
//    res.send("<h1>Hello this is about page</h1>")
// })

app.listen(3000, () => {
  console.log("Server is running 3000 port");
});
