$.getJSON("./Health/city_metrics.json", function(jsonData) {
    var outGeoJson = {}
    outGeoJson['properties'] = jsonData
    outGeoJson['type']= "Feature"
    outGeoJson['geometry']= {"type": "Point", "coordinates":
        [jsonData['lon'], jsonData['lat']]}

        // var jsonFeatures = [];

        // data.forEach(function(point){
        //     var lat = point.latitud;
        //     var lon = point.longitud;
        
        //     var feature = {type: 'Feature',
        //         properties: point,
        //         geometry: {
        //             type: 'Point',
        //             coordinates: [lon,lat]
        //         }
        //     };
        
        //     jsonFeatures.push(feature);
        // });
  
    console.log(outGeoJson)
  });


// $.getJSON("./Health/city_metrics.json", function(jsonData) {
//     var geojson = {
//       type: "FeatureCollection",
//       features: [],
//     };
    
//     for (i = 0; i < jsonData.positions.length; i++)
    
    
    
//         geojson.features.push({
//             "type": "Feature",
//             "geometry": {
//               "type": "Point",
//               "coordinates": [jsonData.positions[i].longitude, jsonData.positions[i].latitude]
//             },
//             "properties": {
//               "report_at": jsonData.positions[i].report_at,
//               "lon": jsonData.positions[i].lon,
//               "lat": jsonData.positions[i].lat,
//               "dir": jsonData.positions[i].dir,
//               "first": jsonData.positions[i].first,
//               "last": jsonData.positions[i].last
//             }
//           });
    
//         console.log(geojson)
//         });

