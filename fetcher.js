
const request = require("request");
const arg = process.argv.slice(2);
const fs = require("fs");

//if file URL is invalid
request(`${arg[0]}`, (error, response, body) => {
  if (error || response.statusCode !== 200) {
    console.log("Something went wrong.  Please check your URL");
    return;
  }
  console.log(arg[1]);
  fs.writeFile(`${arg[1]}`, body, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    //file written successfully
    console.log('file write success');
    let body = fs.statSync(arg[1]);
    console.log(`Downloaded and saved ${body.length} bytes to ${arg[1]}`);
  });

  //if file path already exists
  fs.readFile(
    arg[1],
    'utf8' ,
    (err, data) => {
      if (data !== undefined) {
        if (data.length > 0) {
          console.log('the file already exists');
          return;
        }
      }
    }
  );

});


module.exports = request;