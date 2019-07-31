const Joi = require('joi'); //is a class -- using for input validaion
const config = require('config');
const morgan = require('morgan')
const helmet = require('helmet')
//const logger = require('./logger')
const express =require('express');
const app = express();

app.use(express.json()); // req.body(midleware)
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));
app.use(helmet());

// Configuration
console.log('Application Name: '+ config.get('name'));
console.log('Mail Server: '+ config.get('mail.host'));
if(app.get('env')==='development'){
    app.use(morgan('tiny'));
    console.log('Morgan enabled...')
}
//app.use(logger);

const courses =[
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
];
app.get('/',(req,res)=>{ // root of the website and callback function param -- this is a route
    res.send('Hello'); 
    });
    
    app.get('/api/courses',(req,res)=>{
        res.send([1,2,3]); 
    });

    // api/courses/1
app.get('/api/courses/:id',(req,res)=>{
const course = courses.find(c=>c.id ===parseInt(req.params.id));
if(!course) 
return res.status(404).send('The course with the given id was not found');
res.send(course);
});


//to handle post 
app.post('/api/courses',(req,res)=>{
    const {error} = validateCourse(req.body); // result.error -- object destructure
    if(error)
    return res.status(400).send(error.details[0].message);
    
        const course ={
        id: courses.length +1, 
        name: req.body.name
    };
    courses.push(course);
    res.send(course);});

app.put('/api/courses/:id',(req,res)=>{
    // look up the course
    // If not existing, return 404
    const course = courses.find(c=>c.id ===parseInt(req.params.id));
    if(!course)
    return res.status(404).send('The course with given id was not found');
    // Validate
    //If invalid, retur 400 - bad request    
    const {error} =validateCourse(req.body); // result.error -- object destructure
    if(error)
       return  res.status(400).send(result.error.details[0].message);
    //Update course
    course.name=req.body.name;
    //Return the update course
    res.send(course);
});

app.delete('/api/courses/:id', (req,res)=>{
    // look up the course
    // Not exisitinf,return 404
    const course = courses.find(c=>c.id ===parseInt(req.params.id));
    if(!course)
    return  res.status(404).send('The course with the given id was not found');

    // Delete
    const index = courses.indexOf(course);
    courses = course.splice(index,1);
    // Return the same course
    res.send(course);
});


function validateCourse(course){
    const schema ={
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(course,schema);
    console.log(course);
}
const port = process.env.PORT ||3000;
app.listen(port, ()=> console.log(`listening at port ${port}...`));
