const debug = require('debug')('app:startup');
const Joi = require('joi'); //is a class -- using for input validaion
const config = require('config');
const morgan = require('morgan')
const helmet = require('helmet')
const logger = require('./middleware/logger')
const courses = require('./routes/courses');
const home = require('./routes/home');
const express =require('express');
const app = express();

app.set('view engine','pug');
app.set('views','./views'); //default

app.use(express.json()); // req.body(midleware)
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/',home);
app.use(logger); 

// Configuration
console.log('Application Name: '+ config.get('name'));
console.log('Mail Server: '+ config.get('mail.host'));
if(app.get('env')==='development'){
    app.use(morgan('tiny'));
    console.log('Morgan enabled...')
}
const port = process.env.PORT ||3000;
app.listen(port, ()=> console.log(`listening at port ${port}...`));
