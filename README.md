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
        1. Select the "File" (drop-down) -> "Open Folder".
        2. Select the folder of the app in your home directory.
    4. Update the config
        1. Open "config.json"
        2. Update the URL
        3. Update the username
        4. Update the password
        5. Update the ip
        6. Update the deskNum
4. Run the app.
    1. To start the app, type this command in the terminal:
    ```
    npm start
    ```
    2. To stop the app, push `control` + `c` at the same time on the keyboard.
### Exercise #2: Examine the Hit
1. Go to line 23 of  `livestream_listener.js`.
2. Enter this block of code:
```
// Kill after after a certain # of hits.
if (hits == stopAfter) {
    process.exit();
}
```
4. Add the `stopAfter` variable on about line 14 with a value of `1`;
```
var stopAfter = 1;
```
5. Save `livestream_listener.js`.
6. Run the app in the terminal:
```
npm start
```
### Exercise #3: Count total hits.
1. To display the number of hits, we need a place in the app to do so when our processing is complete.
2. Go to line 32 of `livestream_listener.js`.
3. Add this block of code:
```
var result = {
    totalHits: hits,
    recentHits: recentHits,
    uniqueVisitors: _.keys(uniqueVisitors).length,
    events: events,
    props: props,
    eVars: eVars,
    desks: desks,
    eventData: eventData.slice()
};

return result;
```
4. Change the `stopAfter` value to `10` on line 14.
5. Change the `console.log` on line 20 to give simple feedback when a hit is received.
```
console.log('hit');
```
6. Save `livestream_listener.js`.
7. Go to `connector.js` line 36.
8. Add this block of code:
```
process.on("exit", function() {
    write();
});

function write () {
    _.each(callbacks.writeToDB,     function (item) {
        var result = item();
        console.log(result); //TODO write to db
        webserver.emit('results', result);
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
2. Change the `stopAfter` value to `1000` on line 14.
3. On line 19, add:
```
// Increment total hit counter.
++recentHits;
```
4. Go to line 45 and add this block under the `result` variable:
```
recentHits = 0;
```
5. Save `livestream_listener.js`.
6. Go to `connector.js`.
7. Add this block of code on line 49:
```
setInterval(function () {
  write();
}, 5000);
```
8. Save `connector.js`.
9. Run the app in the terminal:
```
npm start
```
10. To stop the app, push `control` + `c` at the same time on the keyboard.
### Exercise #5: Unique Visitors on site.
1. Go to `livestream_listener.js` and add code for Unique Visitors on site at about line 21:
```
// Calculate Unique Visitors on site.
if(!uniqueVisitors[hit.visIdLow + '' + hit.visIdHigh]) {
    uniqueVisitors[hit.visIdLow + '' + hit.visIdHigh] = true;
}
```
2. Save `livestream_listener.js`.
3. Run the app in the terminal:
```
npm start
```
### Exercise #6: Total events, props, and evars.
1. Go to `livestream_listener.js`.
2. Add processing for Events, Props, and eVars by adding this block of code under the Unique Visitors section on line 26:
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
3. Save `livestream_listener.js`.
4. Run the app in the terminal:
```
npm start
```
### Exercise #7: Single event.
1. Go to `livestream_listener.js`.
2. Add processing for Single Events by adding this block of code under the All Evars section on line 50:
```
// Single Events
if(hit.events) {
    _.each(hit.events, function (item, key) {
        eventData.push({
            eventName: key,
            latitude: hit.geoLatitude,
            longitude: hit.geoLongitude
        });
    });
}
```
3. Add this line of code at line 85:
```
eventData.length = 0;
```
4. Save `livestream_listener.js`.
5. Run the app in the terminal:
```
npm start
```

