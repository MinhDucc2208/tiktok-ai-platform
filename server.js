const express = require("express")
const fetch = require("node-fetch")
const fs = require("fs")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("public"))

let db = require("./database.json")

app.post("/api/register",(req,res)=>{

let {user,pass}=req.body

let exist=db.users.find(x=>x.user===user)

if(exist) return res.json({ok:false})

db.users.push({user,pass})

fs.writeFileSync("database.json",JSON.stringify(db))

res.json({ok:true})

})

app.post("/api/login",(req,res)=>{

let {user,pass}=req.body

let u=db.users.find(x=>x.user===user && x.pass===pass)

if(u) res.json({ok:true})
else res.json({ok:false})

})

app.get("/api/analyze",async(req,res)=>{

let url=req.query.url

let api="https://www.tikwm.com/api/?url="+encodeURIComponent(url)

let r=await fetch(api)

let j=await r.json()

res.json(j.data)

})

app.listen(3000)