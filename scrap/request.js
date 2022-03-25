const request = require('request');
console.log("before");
request('https://clutch.co/directory/mobile-application-developers', cb);
console.log("after")
function cb(error, response, html) {
    console.error('error:', error);
    console.log('statusCode:', response&&response.statusCode);
    console.log('html:', html);
}