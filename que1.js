// que1.js
const commonFunctions = require('./index');

// Extract command-line arguments
const args = process.argv.slice(2); // Remove the first two elements (node and script name)

// Check if the --search option is provided
const searchIndex = args.indexOf('--search');
let searchQuery = null;
if (searchIndex !== -1 && searchIndex + 1 < args.length) {
    searchQuery = args[searchIndex + 1];
}

// Read data from the CSV file using the common function
commonFunctions.readDataFromCSV('./assets/googleplaystore.csv', function(error, data) {
    if (error) {
        console.error(error.message);
        return;
    }

    // Extract app names and reviews based on CSV structure
    const appNames = data.map(entry => entry[0]); // Assuming app names are in the first column
    const reviews = data.map(entry => entry[3]); // Assuming reviews are in the second column

    // If the --search option is provided, filter the data based on the app name
    if (searchQuery) {
        const searchResult = appNames
            .map((appName, index) => ({ App: appName, Reviews: reviews[index] }))
            .filter(entry => entry.App.toLowerCase().includes(searchQuery.toLowerCase()));
        console.log(searchResult);
    } else {
        // Display all app names and review counts
        const filteredData = appNames.map((appName, index) => ({ App: appName, Reviews: reviews[index] }));
        console.log(filteredData);
    }
});