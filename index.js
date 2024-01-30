const { parse } = require("csv-parse");
const fs = require("fs");

function readDataFromCSV(filePath, callback) {
    // Create a read stream
    const stream = fs.createReadStream(filePath);
    const parsedData = [];

    // Parse the CSV data
    stream
        .pipe(parse({ delimiter: ",", from_line: 1 }))
        .on("data", function(row) {
            if (row.length === 13) {
                parsedData.push(row);
            } else {
                console.log(`Skipping invalid line: ${row}`);
            }
        })
        .on("error", function(error) {
            // Handle the errors
            console.log(error.message);
            callback(error, null);
        })
        .on("end", function() {
            // executed when parsing is complete
            console.log("File read successful");
            callback(null, parsedData);
        });

}

// Export the readDataFromCSV function
module.exports = {
    readDataFromCSV,
};