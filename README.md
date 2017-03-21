# Adobe Livestream Demo

## Initial Setup
To run:
```
git clone git@github.com:richiepreece/adobe-livestream-demo
cd adobe-livestream-demo

cp example.config.json config.json
// Populate config file

npm install
npm start
```

## The Lab
### Getting Started
This lab uses the following software:
*Adobe Brackets
*NodeJS
*Mac OS Terminal

### Exercise #1: Download, Configure & Connect
1. Download the code.
    1. Go to the bookmarks in Chrome and select `https://github.com/richiepreece/adobe-livestream-demo`
    2. Click the download green button
    3. Select “Download ZIP”
2. Move the file and unzip it.
    1. Using Finder, locate the file in the Downloads folder.
    2. Move the file to your home directory.
    3. Unzip the file by double clicking it.
3. Prepare the NodeJS app.
    1. Go to the terminal and navigate to the folder.
    2. Run “npm install” and wait.
    3. Copy the config file
    ```
    cp example.config.json config.json
    ```
4. Configure the app.
    1. Open the code in Brackets.
    2. Select the "File" (drop-down) -> "Open Folder".
        1. Select the folder of the app in your home directory.
    4. Update the config
        1. Open "config.json"
        2. Update the URL
        3. Update the username
        4. Update the password
    6. Change the name of the config file
4. Run the app.
    1. To start the app, type this command in the terminal:
    ```
    npm start
    ```
    2. To stop the app, push `control` + `c` at the same time on the keyboard.
### Exercise #2: Examine the Hit
1. Go to line 15 of  `livestream_listener.js`.
2. Enter this block of code:
```
// Kill after after a certain # of hits.
if (hits == stopAfter) {
    process.exit();
}
```
4. Add the `stopAfter` variable on line 7 with a value of `1`;
```
var stopAfter = 1;
```
5. Run the app in the terminal:
```
npm start
```
### Exercise #3: Count total hits.
1. To display the number of hits, we need a place in the app to do so when our processing is complete.
2. Go to line 23 of `livestream_listener.js`.
3. Add this block of code:
```
var result = {
    totalHits: hits
};

return result;
```
4. Change the `stopAfter` value to `10` on line 7.
5. Change the `console.log` on line 13 to give simple feedback when a hit is received.
```
console.log('hit');
```
6. Save `livestream_listener.js`.
7. Go to `connector.js` line 42.
8. Add this block of code:
```
process.on("exit", function() {
    write();
});

function write () {
    _.each(callbacks.writeToDB,     function (item) {
        var result = item();
        console.log(result); //TODO write to db
    });
}
```
9. Save `connector.js`.
10. Run the app in the terminal:
```
npm start
```
### Exercise #4: Count hits overtime.
1. Go to `livestream_listener.js`.
2. On line 6, add the following variables:
```
var recentHits = 0;
```
3. Change the `stopAfter` value to `1000` on line 9.
4. Add
```
// Increment total hit counter.
    ++recentHits;
```
5. Update line 28 to look like this:
```
totalHits: hits,
recentHits: recentHits
```
6. Add this block under the `result` variable:
```
recentHits = 0;
```
7. Save `livestream_listener.js`.
8. Go to `connector.js`.
9. Add this block of code on line 54:
```
setInterval(function () {
  write();
}, 5000)
```
10. Save `connector.js`.
11. Run the app in the terminal:
```
npm start
```
### Exercise #5: Active Visitors on site.
1. Go to `livestream_listener.js` and add a variable for Active Visitors:
```
var uniqueVisitors = {};
```
2. Add the code to calculate Active Visitors at about line 18:
```
// Calculate Active Visitors on site.
if(!uniqueVisitors[hit.visIdLow + '' + hit.visIdHigh]) {
    uniqueVisitors[hit.visIdLow + '' + hit.visIdHigh] = true;
}
```
3. Update the `result` variable on line 33 to be:
```
recentHits: recentHits,
uniqueVisitors: _.keys(uniqueVisitors).length
```
5. Save `livestream_listener.js`.
6. Run the app in the terminal:
```
npm start
```
### Exercise #6: Total events, props, and evars.
1. Go to `livestream_listener.js`.
2. Add a variable for Events, Props, and eVars on about line 8;
```
var events = {};
var props = {};
var eVars = {};
```
3. Add processing for Events, Props, and eVars by adding this block of code under the Active Visitors section:
```
// All Events.
if(hit.events) {
    _.each(hit.events, function (item, key) {
        events[key] = events[key] ? events[key] + 1 : 1;
    });
}

// All Props.
if(hit.props) {
    _.each(hit.props, function (item, key) {
        props[key] = props[key] ? props[key] + 1 : 1;
        props[key] = props[key] || {};
        props[key][item] = props[key][item] ? props[key][item] + 1 : 1;
    });
}

// All eVars.
if(hit.evars && hit.evars.evars) {
    _.each(hit.evars.evars, function (item, key) {
        eVars[key] = eVars[key] || {};
        eVars[key][item] = eVars[key][item] ? eVars[key][item] + 1 : 1;
    });
}
```
4. Update the `result` variable on line 33 to be:
```
uniqueVisitors: _.keys(uniqueVisitors).length,
events: events,
props: props,
eVars: eVars
```
5. Save `livestream_listener.js`.
6. Run the app in the terminal:
```
npm start
```
### Exercise #7: Single event.
Extra Credit.

