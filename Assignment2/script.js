// Leaflet template

$(document).ready(function () {
  // Create a map centered on NYC
  var map = L.map('map').setView([40.731649,-73.977814], 10);
  var dataLayer;
  
  // baselayer
  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
  maxZoom: 18
  }).addTo(map);

var url = 'https://korin.cartodb.com/api/v2/sql?' + $.param({
    q: 'SELECT * FROM table_2015_dep_harbor_survey ORDER BY entero_top LIMIT 10',
  format: 'GeoJSON'
});
$.getJSON(url)

.done(function (data) {
      dataLayer = L.geoJson(data).addTo(map);   
    });

$('.limit').change(function () {
  var url = 'https://korin.cartodb.com/api/v2/sql?' + $.param({
    q: 'SELECT * FROM table_2015_dep_harbor_survey ORDER BY entero_top DESC LIMIT ' + $(this).val(),
    format: 'GeoJSON'
  });
  $.getJSON(url)
  
        .done(function (data) {
        dataLayer.clearLayers();
        dataLayer.addData(data);
      });
  });
});

//want to use this basemap
/*
https://2.aerial.maps.cit.api.here.com/maptile/2.1/maptile/newest/satellite.day/10//600/768/png8?app_id=HrbIxDcMexCChO2loCx3&app_code=Nre849qejL09vhelf0YGCA


  // baselayer
  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
  maxZoom: 18
  }).addTo(map);
*/