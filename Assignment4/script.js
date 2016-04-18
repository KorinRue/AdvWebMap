// Leaflet template

$(document).ready(function () {
  // map centered on Brooklyn
  var map = L.map('map').setView([40.651685,-73.960316], 12);
 

  // baselayer
  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
  maxZoom: 18
  }).addTo(map);

 $.getJSON('https://korin.cartodb.com/api/v2/sql?q=SELECT ST_Transform(ST_ConvexHull(ST_Collect(the_geom_webmercator)), 4326) AS the_geom FROM brooklyn_tree_census GROUP BY diameter&format=GeoJSON')
  
    // stlye convex hull
    .done(function (data) {

      L.geoJson(data, {

    	style: {
    	  color: '#136400',
          fillOpacity: 0.0,
          opacity: 1,
          weight: 1
        },

        	onEachFeature: function (feature, layer) {
   		layer.on('mouseover', function (e) {
   			var layer = e.target;

   			layer.setStyle({
   				color: 'white'
   			});
   		});
	}

      	}).addTo(map);   
    });

  });
