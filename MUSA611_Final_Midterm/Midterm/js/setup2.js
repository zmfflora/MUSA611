// Leaflet map setup

var map=[];
for(i=1;i<=5;i++){
	if(i===1){
		map[i] = L.map('map'+i, {
		center: [40.6971, -73.9488],
		zoom: 11
		});
	}
	else{
		map[i] = L.map('map'+i, {
		center: [40.7829, -73.9654],
		zoom: 12
		});
	}
	var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
	  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	  subdomains: 'abcd',
	  minZoom: 0,
	  maxZoom: 20,
	  ext: 'png'
	}).addTo(map[i]);
}


var dataset = "https://gist.githubusercontent.com/zmfflora/cfd935f660d25a5c0f1444fc7e66faf0/raw/d2d35d6aa1d94a78d692dc99310390d0f167d5a9/uber_hour.geojson";
var featureGroup;
var myStyle1 = function(feature) {
   if(feature.properties.count_all>=0 && feature.properties.count_all<400){
     return {fillColor: '#FCE9E9',
            fillOpacity: 0.75,
            weight: 1,
            opacity: 0.8,
            color: '#ffffff'};
   }
   if(feature.properties.count_all>=400 && feature.properties.count_all<1500){
     return {fillColor: '#F8C3CD',
            fillOpacity: 0.75,
            weight: 1,
            opacity: 0.8,
            color: '#ffffff'};
   }
   if(feature.properties.count_all>=1500 && feature.properties.count_all<2500){
     return {fillColor: '#F4A7B9',
            fillOpacity: 0.75,
            weight: 1,
            opacity: 0.8,
            color: '#ffffff'};
   }
    if(feature.properties.count_all>=2500 && feature.properties.count_all<4000){
     return {fillColor: '#E16B8C',
            fillOpacity: 0.75,
            weight: 1,
            opacity: 0.8,
            color: '#ffffff'};
   }
    if(feature.properties.count_all>=4000 && feature.properties.count_all<7000){
     return {fillColor: '#D0104C',
            fillOpacity: 0.75,
            weight: 1,
            opacity: 0.8,
            color: '#ffffff'};
   }
   if(feature.properties.count_all>=7000){
     return {fillColor: '#8E354A',
            fillOpacity: 0.75,
            weight: 1,
            opacity: 0.8,
            color: '#ffffff'};
   }
};

var myStyle2 = function(feature) {
	var columnname;
    if (page === 2) {
        columnname = "_0";
    } else if (page === 3) {
        columnname = "_8";
    } else if (page === 4) {
        columnname = "_12";
    } else if (page === 5) {
        columnname = "_19";
    }
	//#C5EFFF  #81C7D4 #33A6B8  #0089A7  #336774  #0D5661
	if(feature.properties[columnname]>=0 && feature.properties[columnname]<25){
		return {fillColor: '#C5EFFF',
					 fillOpacity: 0.75,
					 weight: 1,
					 opacity: 0.8,
					 color: '#ffffff'};
	}
	if(feature.properties[columnname]>=25 && feature.properties[columnname]<100){
		return {fillColor: '#A5DEE4',
					 fillOpacity: 0.75,
					 weight: 1,
					 opacity: 0.8,
					 color: '#ffffff'};
	}
	if(feature.properties[columnname]>=100 && feature.properties[columnname]<200){
		return {fillColor: '#81C7D4',
					 fillOpacity: 0.75,
					 weight: 1,
					 opacity: 0.8,
					 color: '#ffffff'};
	}
	 if(feature.properties[columnname]>=200 && feature.properties[columnname]<300){
		return {fillColor: '#0089A7',
					 fillOpacity: 0.75,
					 weight: 1,
					 opacity: 0.8,
					 color: '#ffffff'};
	}
	 if(feature.properties[columnname]>=300 && feature.properties[columnname]<500){
		return {fillColor: '#336774',
					 fillOpacity: 0.75,
					 weight: 1,
					 opacity: 0.8,
					 color: '#ffffff'};
	}
	if(feature.properties[columnname]>=500){
		return {fillColor: '#0D5661',
					 fillOpacity: 0.75,
					 weight: 1,
					 opacity: 0.8,
					 color: '#ffffff'};
	}
};

function loadMap(n)
{
	if(n===1){
		$.ajax(dataset).done(function(data) {
	    var parsedData = JSON.parse(data);
	    //console.log(parsedData);
	    featureGroup = L.geoJson(parsedData, {
	      style: myStyle1,
	      // filter: myFilter
	    }).addTo(map[n]);
	  });
	}
	else{
		$.ajax(dataset).done(function(data) {
	    var parsedData = JSON.parse(data);
	    console.log(parsedData);
	    featureGroup = L.geoJson(parsedData, {
	      style: myStyle2,
	      // filter: myFilter
	    }).addTo(map[n]);
	  });
	}
}
var page=1;

$(function(){
	loadMap(page);
	$('.mapuber').hide();
	$('.mapuber').eq(page-1).show();
	$('.mapBlock').css('position','static');
	$('.uber_control a').click(function(){

			if($(this).hasClass('prePage')){
				page--;
				console.log(page);
				$('.uber_control').find('.nextPage').show();
				if(page <= 1){
					page = 1;
					$('.uber_control').find('.prePage').hide();
				}else{
					$('.uber_control').find('.prePage').show();
				}

			}else if($(this).hasClass('nextPage')){
				page++;
				$('.uber_control').find('.prePage').show();
				if(page >= $('.mapuber').length){
					page = $('.mapuber').length;
					$('.uber_control').find('.nextPage').hide();
				}
			}
		loadMap(page);
		$('.mapuber').hide();
		$('.mapuber').eq(page-1).show();
		$('.uber_title').hide();
		$('.uber_title').eq(page-1).show();
		$('.uber_detail').hide();
		$('.uber_detail').eq(page-1).show();
		if(page===1){
			$('.uber_legend').show();
			$('.uber_legend2').hide();
		}
		else{
			$('.uber_legend').hide();
			$('.uber_legend2').show();
		}
	//	alert(page);
	});
});
