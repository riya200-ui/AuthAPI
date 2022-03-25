const request = require("request");
const cheerio = require("cheerio");
console.log("before");
request('https://clutch.co/directory/mobile-application-developers', cb);

console.log("after")
function cb(error,response, html) {
    if(error){
        console.error('error:',error);
    }else{
        handlehtml(html);
    }
}

function handlehtml(html) {
    let selTool = cheerio.load(html);
    let contentArr = selTool("h3.company_info");
    for(let i = 0; i< contentArr.length; i++) {
        let data = selTool(contentArr[i]).text();
        console.log("c_name", data);
    }

    let cwebsite = selTool("div.rating-reviews.sg-rating");
    for(let i = 0; i< cwebsite.length; i++) {
        let data = selTool(cwebsite[i]).text();
        console.log("c_review", data);
    }

    let caddress = selTool("span.locality ");
    for(let i = 0; i< caddress.length; i++) {
        let data = selTool(caddress[i]).text();
        console.log("c_address", data);
    }

    /*let curl = selTool('  h3.company_info a');
    for(let i = 0; i< curl.length; i++) {
        let data = selTool(curl[i]).text();
        console.log("c_url", data);
    }

    /*let cwebsite = selTool("div.rating-reviews.sg-rating");
    for(let i = 0; i< cwebsite.length; i++) {
        let data = selTool(cwebsite[i]).text();
        console.log("companywebsite", data);
    }*/
}