/* =====================
  Lab 2, part 2 - application state

  Spatial applications aren't typically as simple as putting data on a map. In
  addition, you'll usually need to change the stored data in response to user
  input. This lab walks you through writing a set of functions that are capable
  of building an interactive application.

  First, we'll need to write a function for loading points onto the map. Choose
  any dataset from part1 and write a function here to download it, parse it,
  make it into markers, and plot it. You'll know you've succeeded when you can
  see markers on the map.

  NOTE 1: When we have added markers to the map in the past, we have used a line like:

       L.marker([50.5, 30.5]).addTo(map);

       This is accomplishing two goals. L.marker([50.5, 30.5]) makes a marker
       and .addTo(map) adds that marker to the map. This task differs in that,
       you are being asked to create separate functions: one to create markers
       and one to add them to the map.

  (IMPORTANT!)
  NOTE 2: These functions are being called for you. Look to the bottom of this file
       to see where and how the functions you are defining will be used. Remember
       that function calls (e.g. func();) which are equal to a value (i.e. you
       can set a var to it: var result = func();) must use the 'return' keyword.

       var justOne = function() {
         return 1;
       }
       var one = justOne();
===================== */

// We set this to HTTP to prevent 'CORS' issues
var downloadData = $.ajax("https://raw.githubusercontent.com/CPLN692-MUSA611/datasets/master/json/philadelphia-solar-installations.json");
var parseData = function(inputdata) {
  return JSON.parse(inputdata);
};

var makeMarkers = function(persedData) {
  return _.map(persedData,function(dataToMark){
    return L.marker([dataToMark.LAT,dataToMark.LONG_]);
  });
};

var plotMarkers = function(markers) {
  _.each(markers,function(inputmarker){
     inputmarker.addTo(map);
  });
};

/* =====================
  Define the function removeData so that it clears the markers you've written
  from the map. You'll know you've succeeded when the markers that were
  previously displayed are immediately removed from the map.

  In Leaflet, the syntax for removing one specific marker looks like this:

  map.removeLayer(marker);

  In real applications, this will typically happen in response to changes to the
  user's input.
===================== */

var removeMarkers = function(markers) {
  _.each(markers,function(markerToDel){
    map.removeLayer(markerToDel);
  });
};

/* =====================
  Optional, stretch goal
  Write the necessary code (however you can) to plot a filtered down version of
  the downloaded and parsed data.

  Note: You can add or remove from the code at the bottom of this file.
===================== */

/* =====================
 Leaflet setup - feel free to ignore this
===================== */

var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 14
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

/* =====================
 CODE EXECUTED HERE!
===================== */

downloadData.done(function(data) {
  var parsed = parseData(data);
  //select those Solar Installations whose ZIPCODE is smaller than 19130
  var newparsed = _.filter(parsed,function(inputdata){
    return inputdata.ZIPCODE <19130;
  });
  var markers = makeMarkers(newparsed);
  plotMarkers(markers);
  removeMarkers(markers);
});
