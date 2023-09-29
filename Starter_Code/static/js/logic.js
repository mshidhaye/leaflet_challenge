// Store our API endpoint as queryURL
var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Create the map
var myMap = L.map("map", {
  center: [40.7, -94.5],
  zoom: 3
});

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);
// // Define the "streetmap" layer
// var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// });

// // Add the "streetmap" layer to the map
// streetmap.addTo(map);

L.tileLayer

// Retrieve and add the earthquake data to the map
d3.json(queryURL).then(function (data) {
  function mapStyle(feature) {
      return {
          opacity: 1,
          fillOpacity: 1,
          fillColor: mapColor(feature.geometry.coordinates[2]),
          color: "black",
          radius: mapRadius(feature.properties.mag),
          stroke: true,
          weight: 0.5
      };

      // Establish colors for depth
  }
  function mapColor(depth) {
      switch (true) {
          case depth > 90:
              return "red";
          case depth > 70:
              return "orangered";
          case depth > 50:
              return "orange";
          case depth > 30:
              return "gold";
          case depth > 10:
              return "yellow";
          default:
              return "palegreen";
      }
  }
  // Establish magnitude size
  function mapRadius(mag) {
      if (mag === 0) {
          return 1;
      }

      return mag * 4;
  }

  // Add earthquake data to the map
  L.geoJson(data, {

      pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng);
      },

      style: mapStyle,

      // Activate pop-up data when circles are clicked
      onEachFeature: function (feature, layer) {
          layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place + "<br>Depth: " + feature.geometry.coordinates[2]);

      }
  }).addTo(myMap);



// Add the legend with colors to corrolate with depth
var legend = L.control({position: "bottomright"});
legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend"),
    depth = [-10, 10, 30, 50, 70, 90];

    div.innerHTML += "<h3 style='text-align: center'>Depth</h3>"
for (var i = 0; i < depth.length; i++) {
  div.innerHTML +=
  '<i style="background:' + mapColor(depth[i] + 1) + '"></i> ' + depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
}
return div;
};
legend.addTo(myMap)
});