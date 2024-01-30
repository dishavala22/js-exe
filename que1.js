const fs = require('fs');
const {parse }= require('csv-parse');

const path = './assets/googleplaystore.csv';

function listApps(searchTerm) {
  const readStream = fs.createReadStream(path);
  const csvParser = parse({ delimiter: ',', columns: true });

  readStream.pipe(csvParser);

  let totalReviews = 0;
  const filteredApps = [];

  csvParser.on('data', function (row) {
    try {
      // Ensure that the row has the expected number of columns
      if (Object.keys(row).length === 13) {
        if (!searchTerm || row['App'].toLowerCase().includes(searchTerm.toLowerCase())) {
          const reviews = parseInt(row['Reviews'], 10) || 0;
          totalReviews += reviews;
          filteredApps.push({ name: row['App'], reviews });
        }
      } else {
        console.error('Invalid number of columns in CSV record:', row);
      }
    } catch (error) {
      console.error('Error processing CSV record:', error.message);
    }
  });

  csvParser.on('error', function (error) {
    console.error('Error parsing CSV:', error.message);
  });

  csvParser.on('end', function () {
    printResults(filteredApps, totalReviews);
  });
}

function printResults(apps, totalReviews) {
  apps.forEach(app => {
    console.log(`${app.name}: ${app.reviews} reviews`);
  });
  console.log(`Total Reviews: ${totalReviews}`);
}

function readCommandLineArguments() {
  const args = process.argv.slice(2);
  const searchFlagIndex = args.indexOf('--search');
  return searchFlagIndex !== -1 ? args.slice(searchFlagIndex + 1).join(' ') : null;
}

const searchTerm = readCommandLineArguments();
listApps(searchTerm);
