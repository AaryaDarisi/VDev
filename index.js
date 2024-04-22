const { error } = require("console");
const express=require("express");
const axios=require("axios");
const session = require('express-session');
const app=express();

const path=require("path");

const methodOverride=require("method-override")


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(session({
    secret: 'app', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true for https
  }));

const {v4: uuidv4}=require("uuid");

const mysql=require("mysql2");

let answers=[];

let teacher=[
    {
        id:"123",
        password:"123"
    },
    {
        id:"456",
        password:"456"
    }
];

let student=[
    {
        id:"22BAI1369",
        password:"aarya"
    },
    {
        id:"22BAI1234",
        password:"zakir"
    },
    {
        id:"22BAI1390",
        password:"yogit"
    }
]

const port=8888;

let question="asfd";

app.get("/newQuestion",(req,res)=>
{
    res.render("teacher.ejs");
})

app.get("/login",(req,res)=>
{
    req.session.destroy()    
    res.render("login.ejs");
})

app.patch("/auth",(req,res)=>
{
    let isit=false;
    let {username:id,password:pwd}=req.body;
    for(user of teacher)
    {
        if(user.id==id)
        {
            isit=true;
            if(user.password==pwd)
            {
                req.session.teacherId = id;
                console.log(req.session);
                //render questions page
                res.render("teacher1.ejs",{id});
            }
            else
            {
                //stay in login page
                req.session.destroy()                    
                res.render("login.ejs");
            }
            break;
        }
    }
    if(!isit)
    {
        for(user of student)
        {
            if(user.id==id)
            {
                if(user.password==pwd)
                {
                    //render home page that should show the exam page
                    req.session.studentId=id;
                    res.render("home.ejs",{question,id});
                }
                else
                {
                    //stay in login page
                    req.session.destroy()
                    res.render("login.ejs");
                }
                break;
            }
        }
    }
    
})

app.get("/exam/:id",(req,res)=>
{
    let {id}=req.params
    if(req.session.studentId!=id)
    {
        req.session.destroy()
        res.render("login.ejs");
    }
    res.render("index.ejs",{question,id});
})


//giving marks
app.patch("/submit/:id",(req,res)=>
{
    let {marks}=req.body;
    let{id}=req.params;
    for(body of answers)
    {
        if(body.id===id)
        {
            body.score=marks;
            break;
        }
    }
    res.render("submit.ejs",{answers,id});//i should go to students view again not exam
})

//after student submits
app.post("/submit/:id",(req,res)=>
{
    let {id}=req.params;
    for(let i=0; i<answers.length;i++)
    {
        if(answers[i].id==id)
        {
            answers.splice(i,1);
            break;
        }
    }
    let body=req.body;
    body.id=id;
    body.score="";
    answers.push(body);
    res.render("studentSubmit.ejs");
})

app.get("/view/:id/:teacherId",(req,res)=>
{
    let {teacherId}=req.params;
    if(req.session.teacherId!=teacherId)
    {
        req.session.destroy();
        res.render("login.ejs");
    }
    let {id}=req.params;
    console.log(id);
    let isit=false;
    for(let ans of answers)
    {
        if(ans.id===id)
        {
            isit=true;
            console.log("passed");
            res.render("view.ejs",{ans,question});
            break;
        }
    }
    if(!isit)
    {
        console.log(`${id} is not a valid address please check it`);
    }
})

app.get("/viewSubmissions/:id",(req,res)=>
{
    let {id}=req.params;
    if(req.session.teacherId!=id)
    {
        req.session.destroy();
        res.render("login.ejs");
    }
    res.render("submit.ejs",{answers,id});
})

app.post("/success",(req,res)=>
{
    question=req.body.question;
    res.render("posted.ejs");
})

app.listen(port,()=>
{
    console.log(`listening at port ${port}`);
})