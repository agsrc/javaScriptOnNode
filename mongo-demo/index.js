const mongoose =require('mongoose');

mongoose.connect('mongodb://localhost/playground') // playground is the database
.then(()=>console.log('connected to MongoDB...')) //returns a promise
.catch(err=>console.error('could not connect to mongoDB!', err));


const courseSchema = new mongoose.Schema({
    name: {
        type: String,
         required:true,
        minlength: 5,
        maxlength:255},
        category:{
            type:String,
            enum:['web','mobile','network']
        }, 
    author: String,
    tags:{
        type:Array,
        validate:{
            isAsync: true,
            validator: function(v,callback){
                setTimeout(()=>{
                   //do some async work 
                   const result= v && v.length >0;
                   callback(result);
                },1000)
            },
            message:'A course should have atleast one tag'
        }
        }
    },
    date:{type: Date, default: Date.now},
    isPublished: Boolean,
    price: {
        type: Number,
        required: function(){ return this.isPublished;},
        min:10,
        max:200
    }
});

const Course = mongoose.model('Course',courseSchema); //pascal case for classes

async function createCourse(){
const course =  new Course({
   // name: 'Angular Course',
   category: '-',
    author:'Mosh',
    tags: ['angular', 'frontend'], //schemaless property would take care
    isPublished: true,
   // price: 15
});

try{
    //  course.validate((err)=>{ // design flaw because it returns void
    //      if(err){}
    //  });
    
const result = await course.save(); 
console.log(result);
}
catch(ex){
    for(field in ex.errors)
    console.log(ex.errors[field].message); //displaying all the validate errors
}
}

async function getCourse(){
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
createCourse();

