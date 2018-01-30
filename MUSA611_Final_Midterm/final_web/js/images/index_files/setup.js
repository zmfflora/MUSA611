// Leaflet map setup

var map1 = L.map( 'map1', {
  center: [40.7829, -73.9654],
  zoom: 12
});
var map2 = L.map('map2', {
  center: [40.7829, -73.9654],
  zoom: 13
});
var map3 = L.map('map3', {
  center: [40.7829, -73.9654],
  zoom: 12
});

var Stamen_TonerLite = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map3);

var dataset = "https://gist.githubusercontent.com/zmfflora/a2d193052875564df5fcde6eca29d346/raw/acb94342fe18c727fc207e84575518d4a030a350/uber_nyc.geojson";
var featureGroup;
var myStyle = function(feature) {
  var columnname;
  if(displayDay=="Monday")
  {
    columnname="Count_";
  }else if(displayDay=="Tuesday")
  {
    columnname="Count_1";
  }
  else if(displayDay=="Wednesday")
  {
    columnname="Count_2";
  }
  else if(displayDay=="Thursday")
  {
    columnname="Count_3";
  }
  else if(displayDay=="Friday")
  {
    columnname="Count_4";
  }
  else if(displayDay=="Saturday")
  {
    columnname="Count_5";
  }
  else if(displayDay=="Sunday")
  {
    columnname="Count_6";
  }
   if(feature.properties[columnname]>=0 && feature.properties[columnname]<25){
     return {fillColor: '#FCE9E9',fillOpacity:0.75,weight:1, opacity:0.8,color:'#ffffff'};
   }
   if(feature.properties[columnname]>=25 && feature.properties[columnname]<100){
     return {fillColor: '#F8C3CD',fillOpacity:0.75,weight:1, opacity:0.8,color:'#ffffff'};
   }
   if(feature.properties[columnname]>=100 && feature.properties[columnname]<200){
     return {fillColor: '#F4A7B9',fillOpacity:0.75,weight:1, opacity:0.8,color:'#ffffff'};
   }
    if(feature.properties[columnname]>=200 && feature.properties[columnname]<400){
     return {fillColor: '#E16B8C',fillOpacity:0.75,weight:1, opacity:0.8,color:'#ffffff'};
   }
    if(feature.properties[columnname]>=400 && feature.properties[columnname]<1000){
     return {fillColor: '#D0104C',fillOpacity:0.75,weight:1, opacity:0.8,color:'#ffffff'};
   }
   if(feature.properties[columnname]>=1000){
     return {fillColor: '#8E354A',fillOpacity:0.75,weight:1, opacity:0.8,color:'#ffffff'};
     //#8E354A  #D0104C  #E16B8C #F596AA  #F4A7B9  #F8C3CD  #FEDFE1
   }

};

var eachFeatureFunction = function(layer) {
  // console.log(layer);
  layer.on('click', function (event) {

  });
};
var displayDay="Monday";
var myFilter = function(feature) {
  //console.log(feature.properties.COLLDAY);
  if(feature.properties.COLLDAY===" "){
    return false;
  }
  else{
    return true;
  }
};

$(document).ready(function() {

  loadMap3();

});

function loadMap3()
{
//map3
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    console.log(parsedData);
    featureGroup = L.geoJson(parsedData, {
      style: myStyle,
      // filter: myFilter
    }).addTo(map3);

    // quite similar to _.each
    // featureGroup.eachLayer(eachFeatureFunction);
  });



}
function getval(sel)
{
	// var VariaData=[
	// 	['denpendent Variable','',''],
	// 	['COUNT','Number of Uber Trip','Numeric'],
	// 	['HOUR','Number In a Day','Categorical'],
	// 	['WEEKDAY','Day in a Week',''],
	// ];
	// setVtable(VariaData);

	displayDay=sel.value;
  featureGroup.clearLayers();
   loadMap3();



}

var myIcon = L.icon({
  iconUrl: 'js/images/pickup.png',
  iconSize: [29, 24],
  iconAnchor: [9, 21],
  popupAnchor: [0, -14]
});

var cartoUserName = 'zmfflora';
var cartoVizId = 'dd1efc8a-3c39-11e7-8161-0e233c30368f';
var layerUrl = 'https://'+cartoUserName+'.carto.com/api/v2/viz/'+cartoVizId+'/viz.json';
var markerClusters = L.markerClusterGroup();

L.tileLayer( 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
 attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
 subdomains: 'abcd',
 minZoom: 0,
 maxZoom: 20,
 ext: 'png'
}).addTo( map1 );

var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map2);

var overview_data ="https://gist.githubusercontent.com/zmfflora/ceb24304cfc52e3762fc37393032e6b5/raw/52ec22fc574ff4660958c4d15e3d93e2662f70f6/uber_sample.geojson";
var overview_featureGroup;

//load map1
$.ajax(overview_data).done(function(data) {
  var parsedData_new = JSON.parse(data);
  // console.log(parsedData_new.features[1]);

  for ( var i = 0; i < parsedData_new.features.length; ++i ){
    var latitude = parsedData_new.features[i].properties.lat;
    var longitude = parsedData_new.features[i].properties.lon;
    var popup = parsedData_new.features[i].properties.date_time;

    var m = L.marker( [latitude, longitude], {icon: myIcon} )
  							  .bindPopup( popup );

   markerClusters.addLayer( m );
  }



});
//load map2
function AnimatedCartodbCreateLayer()
{
cartodb.createLayer(map2, layerUrl)
        .on('done', function(layer) {
          layer.addTo(map2);
        }).on('error', function(err) {
          console.log(err);
        });
}

map1.addLayer( markerClusters );

$( document ).ready(function() {
  $("#FirstPart").show();
  $("#SecondPart").hide();
  $("#ThirdPart").hide();

  $(".btn").click(function(){
		$('.map').hide();
		$('.mapTips').hide();
	  var getID = $(this).attr("id");
	  if(getID=="btnOverview")
	  {
			$("#map1").show();
		 // map.removeLayer(Stamen_TonerLite);
			$("#FirstPart").show();
			$("#SecondPart").hide();
			$("#ThirdPart").hide();
			//function for map
	  }
	  else if(getID=="btnAnimated")
	  {
			$("#map2").show();
			$("#FirstPart").hide();
			$("#SecondPart").show();
			$("#ThirdPart").hide();
			//function for map
      AnimatedCartodbCreateLayer();

	  }
	  else if(getID=="btnPredict")
	  {
			$("#map3").show();
			$('.mapTips').show();
			$("#FirstPart").hide();
			$("#SecondPart").hide();
			$("#ThirdPart").show();
			//function for map

	  }
	});

});

var showResults = function() {
  /* =====================
  This function uses some jQuery methods that may be new. $(element).hide()
  will add the CSS "display: none" to the element, effectively removing it
  from the page. $(element).show() removes "display: none" from an element,
  returning it to the page. You don't need to change this part.
  ===================== */
  // => <div id="intro" css="display: none">
  $('#intro').hide();
  // => <div id="results">
  $('#results').show();
};

function setVtable(VariaData){
	var header=$('.VaribleTable').find('.Vt_title').clone();
	$('.VaribleTable').empty().append(header);

	$.each(VariaData,function(k,v){
		tr="<tr><td>"+v[0]+"</td><td>"+v[1]+"</td><td>"+v[2]+"</td></tr>";
		$('.VaribleTable').append(tr);
	});
}
