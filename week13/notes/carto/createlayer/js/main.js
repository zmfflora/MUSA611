// Leaflet map setup
var map = L.map('map', {
  center: [41.133004, -77.593477],
  zoom: 7
});

var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

var cartoUserName = 'jefffrankl';

var myLayer;

var districts = cartodb.createLayer(map, {
  user_name: cartoUserName,
  type: 'cartodb',
  interactivity: true,
  sublayers: [
    {
      sql: "SELECT the_geom, district_number, the_geom_webmercator FROM pacd_2011",
      cartocss: '#pacd_2011 { line-width: 1; line-color: #0B645E; polygon-fill: #fff; polygon-opacity: 0; line-opacity: 1;}',
      interactivity: ['district_number'], // Define properties you want to be available on interaction
   }
  ]
}).addTo(map)
  .on('done', function(layer) {
    // Set interactivity
    layer.setInteraction(true);
    // Set up event
    layer.on('featureClick',function(e, latlng, pos, data) {
      console.log(data);
    });
  }).on('error', function() {
    console.log("some error occurred");
});
