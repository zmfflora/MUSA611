/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */
var parseData = function(inputdata) {
  return JSON.parse(inputdata);
};





var removeMarkers = function(markers) {
  _.each(markers,function(markerToDel){
    map.removeLayer(markerToDel);
  });
};


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

$(document).ready(function() {

  $("button").click(function(e) {
     url = $("#text-input1").val();
     latitude = $("#lat-input1").val();
     longitude = $("#long-input2").val();
     console.log(url, latitude, longitude);


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

     var downloadData = $.ajax(url);
     downloadData.done(function(data){
         var parsed = parseData(data);
         var markers = makeMarkers(parsed);
         plotMarkers(markers);
         //removeMarkers(markers);
     });
   });
});
