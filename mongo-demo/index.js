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

createCourse();
