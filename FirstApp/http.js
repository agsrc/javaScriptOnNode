
const http = require('http');

const server = http.createServer((req,res)=>{//inherits from net.server which is an evenEmitter
    if(req.url==='/'){
        res.write('Hello Word');
        res.end();
    }
    if(req.url==='/api/courses'){
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }
    
}); 

server.on('connection',(socket)=>{
    console.log('New Connection...');
})
server.listen(3000);

console.log('Listening on port 3000...');