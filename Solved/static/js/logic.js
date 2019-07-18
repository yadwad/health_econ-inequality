// $.getJSON("./Health/city_metrics.json", function(jsonData) {
//   var outGeoJson = {}
//   outGeoJson['properties'] = jsonData
//   outGeoJson['type']= "Feature"
//   outGeoJson['geometry']= {"type": "Point", "coordinates":
//       [jsonData['lon'], jsonData['lat']]}

//       // var jsonFeatures = [];

//       // data.forEach(function(point){
//       //     var lat = point.latitud;
//       //     var lon = point.longitud;
      
//       //     var feature = {type: 'Feature',
//       //         properties: point,
//       //         geometry: {
//       //             type: 'Point',
//       //             coordinates: [lon,lat]
//       //         }
//       //     };
      
//       //     jsonFeatures.push(feature);
//       // });

//   console.log(outGeoJson)
// });

// Creating map object
var myMap = L.map("map", {
  center: [40.7128, -74.0059],
  zoom: 11
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// Link to GeoJSON
var APILink = "https://github.com/yadwad/project/blob/master/health_test.geojson";

var geojson;

// Grab data with d3
d3.json("APILink", function(data) {

  // Create a new choropleth layer
  geojson = L.choropleth(data, {

    // Define what  property in the features to use
    valueProperty: "estimate",

    // Set color scale
    scale: ["#ffffb2", "#b10026"],

    // Number of breaks in step range
    steps: 10,

    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    style: {
      // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
    },

    // Binding a pop-up to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup(feature.properties.city+ ", " + feature.properties.state_name + "<br>Median Household Income:<br>" +
        "$" + feature.properties.estimate);
    }
  }).addTo(myMap);

  // Set up the legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = geojson.options.limits;//income
    var colors = geojson.options.colors;
    var labels = [];

    // Add min & max
    var legendInfo = "<h1>Median Income</h1>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">" + limits[0] + "</div>" +
        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding legend to the map
  legend.addTo(myMap);

});



//Test 

// //Creating map object
// var myMap = L.map("map", {
//   center: [40.7128, -74.0059],
//   zoom: 11
// });

// // Adding tile layer
// L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   maxZoom: 18,
//   id: "mapbox.streets",
//   accessToken: API_KEY
// }).addTo(myMap);

// // //convert geojson
// // var jsonFeatures = [];

// // data.forEach(function(point){
// //     var lat = point.latitud;
// //     var lon = point.longitud;

// //     var feature = {type: 'Feature',
// //         properties: point,
// //         geometry: {
// //             type: 'Point',
// //             coordinates: [lon,lat]
// //         }
// //     };

// //     jsonFeatures.push(feature);
// // });

// // var geoJson = { type: 'FeatureCollection', features: jsonFeatures };

// // L.geoJson(geoJson).addTo(map);

// // Link to GeoJSON
// var APILink = "health_test.geojsontoken=93231aa8e7a0bae445a7ef1053cae96d&city_name=Anchorage&state_abbr=AK&data_yr_type=2015-2016";

// var geojson;

// // Grab data with d3
// d3.json(APILink, function(data) {

//   // Create a new choropleth layer
//   geojson = L.choropleth(data, {

//     // Define what  property in the features to use
//     valueProperty: "Absenteeism",

//     // Set color scale
//     scale: ["#ffffb2", "#b10026"],

//     // Number of breaks in step range
//     steps: 10,

//     // q for quartile, e for equidistant, k for k-means
//     mode: "q",
//     style: {
//       // Border color
//       color: "#fff",
//       weight: 1,
//       fillOpacity: 0.8
//     },

//     // Binding a pop-up to each layer
//     onEachFeature: function(properties, layer) {
//       layer.bindPopup(properties.rows.city_name + ", " + properties.rows.metric_name + "<br>Median Household Income:<br>" +
//         "$" + properties.rows.group_name);
//     }
//   }).addTo(myMap);

//   // Set up the legend
//   var legend = L.control({ position: "bottomright" });
//   legend.onAdd = function() {
//     var div = L.DomUtil.create("div", "info legend");
//     var limits = geojson.options.limits;//income
//     var colors = geojson.options.colors;
//     var labels = [];

//     // Add min & max
//     var legendInfo = "<h1>Median Income</h1>" +
//       "<div class=\"labels\">" +
//         "<div class=\"min\">" + limits[0] + "</div>" +
//         "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
//       "</div>";

//     div.innerHTML = legendInfo;

//     limits.forEach(function(limit, index) {
//       labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
//     });

//     div.innerHTML += "<ul>" + labels.join("") + "</ul>";
//     return div;
//   };

//   // Adding legend to the map
//   legend.addTo(myMap);

// });

// Plotly.newplot.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/2011_us_ag_exports.csv', function(err, rows){
//       function unpack(rows, key) {
//           return rows.map(function(row) { return row[key]; });
//       }

//       var data = [{
//           type: 'choropleth',
//           locationmode: 'USA-states',
//           locations: unpack(rows, 'code'),
//           z: unpack(rows, 'total exports'),
//           text: unpack(rows, 'state'),
//           zmin: 0,
//           zmax: 17000,
//           colorscale: [
//               [0, 'rgb(242,240,247)'], [0.2, 'rgb(218,218,235)'],
//               [0.4, 'rgb(188,189,220)'], [0.6, 'rgb(158,154,200)'],
//               [0.8, 'rgb(117,107,177)'], [1, 'rgb(84,39,143)']
//           ],
//           colorbar: {
//               title: 'Millions USD',
//               thickness: 0.2
//           },
//           marker: {
//               line:{
//                   color: 'rgb(255,255,255)',
//                   width: 2
//               }
//           }
//       }];


//       var layout = {
//           title: '2011 US Agriculture Exports by State',
//           geo:{
//               scope: 'usa',
//               showlakes: true,
//               lakecolor: 'rgb(255,255,255)'
//           }
//       };

//       Plotly.newplot.plot(myDiv, data, layout, {showLink: false});
// });
