// Leaflet template

$(document).ready(function () {
  // NYC-centered map
  var map = L.map('map').setView([40.731649,-73.977814], 10);
  var dataLayer;
  
  // baselayer
  L.tileLayer('https://2.aerial.maps.cit.api.here.com/maptile/2.1/maptile/newest/satellite.day/{z}/{x}/{y}/256/png8?app_id=HrbIxDcMexCChO2loCx3&app_code=Nre849qejL09vhelf0YGCA', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
  maxZoom: 18
  }).addTo(map);
 

//mapzen geocoder
L.control.geocoder('search-xBMCfMW', {
  position: 'topright'
}).addTo(map);




var url = 'https://korin.cartodb.com/api/v2/sql?' + $.param({
    q: 'SELECT * FROM table_2015_dep_harbor_survey',
  format: 'GeoJSON'
});
$.getJSON(url, function(json) {
//time slider
  var testlayer = L.geoJson(json),
      sliderControl = L.control.sliderControl({
        position: "topright",
        layer: testlayer
      });
  
  //for a range-slider
    sliderControl = L.control.sliderControl({
      position: "topright",
      layer: testlayer,
      range: true
    });

  map.addControl(sliderControl);

  sliderControl.startSlider(); 
});

$('#slider-timestamp').html(options.markers[ui.value].feature.properties.date);
/*
.done(function (data) {
      dataLayer = L.geoJson(data, {
        //must include this so points aren't just standard Leaflet markers
        pointToLayer: function (feature,latlng) {
          return L.circleMarker(latlng);
        },

        //styling generic
        style: function (feature) {
          var style = {
            fillColor: '#1a9641',
            fillOpacity: 0.2,
            radius: 5,
            stroke: false
          };
          //conditional to size and color points
          if (feature.properties.entero_top > 105) {
            style.fillColor = '#fdae61',
            style.radius = 10;
          }
          if (feature.properties.entero_top > 640) {
            style.fillColor = '#d7191c',
            style.radius = 15;
          }
          return style;
        }




      }).addTo(map);   
    });

//Drop down - I don't want to use this right now, but may use it later..
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

*/
});