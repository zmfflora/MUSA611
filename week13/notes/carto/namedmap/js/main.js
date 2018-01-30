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

var myLayer = L.tileLayer('https://jefffrankl.carto.com/api/v1/map/named/district_2011/all/{z}/{x}/{y}.png?auth_token=auth_token1', {
}).addTo(map);
