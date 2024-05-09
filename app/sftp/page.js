const fs = require('fs');
    
export default async function handler(req, res) {
  //...
    fs.writeFileSync('example.json', "testing")
    console.log("req.body")
    return 
  //...
}