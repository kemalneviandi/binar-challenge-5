const express = require ("express");
const fs = require ("fs");
const bodyparser = require ("body-parser");
const app = express()
const port = process.env.PORT || 3000
const pengguna= fs.readFileSync("users.json");
const users = JSON.parse(pengguna);
// console.log(users)


app.use (bodyparser.json())
app.use (bodyparser.urlencoded({extended:true}))
app.set ("view engine", "ejs")

app.use (express.static ("public"))

app.get ("/",(req,res) =>{
    res.render ("login")
})
app.post ("/login", (req,res) =>{
    if (req.body.username  == users.username && req.body.password == users.password){
        res.redirect("/home")
        
    }else {
        res.send ("wrong username or password")
    }
})
app.get ("/home",(req,res) =>{
    res.render ("home")
})
app.get ("/game",(req,res) =>{
    res.render ("game")
})
app.get ("/API",(req,res) =>{
    res.send ({username: users.username, password: "****"})
})
app.listen(port)