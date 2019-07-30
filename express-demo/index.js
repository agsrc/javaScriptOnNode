const express =require('express');
const app = express();

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
if(!course) res.status(404).send('The course with the given id was not found');
res.send(course);
});

app.post('/api/courses',(req,res)=>{
    const course ={
        id: courses.length +1
    };
});
const port = process.env.PORT ||3000;
app.listen(port, ()=> console.log(`listening at port ${port}...`));
