const mongoose =require('mongoose');

mongoose.connect('mongodb://localhost/playground') // playground is the database
.then(()=>console.log('connected to MongoDB...')) //returns a promise
.catch(err=>console.error('could not connect to mongoDB!', err));


const courseSchema = new mongoose.Schema({
    name: String, 
    author: String,
    tags:[String],
    date:{type: Date, default: Date.now},
    isPublished: Boolean
});

const Course = mongoose.model('Course',courseSchema); //pascal case for classes

async function createCourse(){
const course =  new Course({
    name: 'Angular Course',
    author:'Mosh',
    tags: ['angular', 'frontend'], //schemaless property would take care
    isPublished: true
});


const result = await course.save(); 
console.log(result);
}

async function getCourses(){
// /api/courses?pageNumber=2&pageSize=10
    const pageNumber =2;
    const pageSize=10;
    //eq(equal)
    //ne (not equal)
    //nin(not in)

    const courses = await Course
    //.find({author: 'Mosh',isPublished:true}) with filters returns promise -- document query object though
    //.find({price:{$gt:10, $lte:20}}) // replace value with objwct
    .find({price: {$in:[10,15,20]}})
    .skip((pageNumber-1)*pageSize)
    .limit(pageSize)
    .sort({name:1})
    .select({name:1, tags:1});
    console.log(courses);
};
getCourses();

