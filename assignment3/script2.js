// Leaflet template

$(document).ready(function () {
  // NYC-centered map
  var sliderControl = null;

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
$.getJSON(url, function (data) {

    dataLayer = L.geoJson(data, {
      //must include this so points aren't just standard Leaflet markers
      pointToLayer: function (feature,latlng) {
        return L.circleMarker(latlng);
      },
      //styling generic
      style: function (feature) {
        var style = {
          fillColor: '#1a9641',
          fillOpacity: 1,
          radius: 5,
          stroke: true,
          color: 'white',
          weight: 1
        };
        //conditional to color points based on enterococcus counts
        if (feature.properties.entero_top > 105) {
          style.fillColor = '#fdae61';
        }
        if (feature.properties.entero_top > 640) {
          style.fillColor = '#d7191c';
        }
        return style;
        }

//time slider
/*
          function (json) {
          var sliderLayer = L.geoJson(json)
            slider control = L.control.sliderControl({
              position: "bottom",
              layer: sliderLayer
            });
          };  
    });
*/

//Create a marker layer (in the example done via a GeoJSON FeatureCollection)
var testlayer = L.geoJson(json);
var sliderControl = L.control.sliderControl({position: "topright", layer: testlayer});

//Make sure to add the slider to the map ;-)
map.addControl(sliderControl);

//And initialize the slider
sliderControl.startSlider();

    }).addTo(map);  

});

})

