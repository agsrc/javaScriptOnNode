var url = 'http://mylogger.io/log'

function log(message){
    //Send Http request
    console.log(message);
}

module.exports.log =log;
