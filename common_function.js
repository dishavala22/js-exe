
const { parse } = require("csv-parse");
const fs = require("fs");

// specify the path of the CSV file
const path = "./assets/googleplaystore.csv";

// Create a readstream


fs.createReadStream(path)
  .pipe(parse({ delimiter: ",", from_line: 1 }))
  .on("data", function (row) {
    // executed for each row of data
    console.log(row);
  })
  .on("error", function (error) {
    // Handle the errors
    console.log(error.message);
  })
  .on("end", function () {
    // executed when parsing is complete
    console.log("File read successful");
  });