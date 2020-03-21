/**
 * Layers 
 */

function onEachFeature(feature, layer) {

    var popupContent = "<p> <ul> <li> Wilaya : "       + feature.properties.name     + "</li>"
                                + "<li> ولاية : "       + feature.properties.name_ar  + "</li>"
                                + "<li> Infections : " + feature.properties.infected + "</li>"
                                +"</ul></p>";

    if (feature.properties && feature.properties.popupContent) {
        popupContent += feature.properties.popupContent;
    }

    layer.bindPopup(popupContent);
}

var layerOSM  = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1
});

var layerWilaya = L.geoJSON([wilaya], {

    style: function (feature) {
        return feature.properties && {
            fillColor: feature.properties.fill, 
            fillOpacity: feature.properties.fillOpacity,
            color: "#999",
            weight: 1
         };
    },

    onEachFeature: onEachFeature,

});

/**
 * map initialisation
 */

var mapLayerGroup = L.layerGroup([layerWilaya]);

var baseLayers = {
    "OpenStreetMap": layerOSM
};

var overlays = {
    "Wialya": mapLayerGroup
};

var map = L.map('map', {layers: [layerWilaya]}).setView([28.0, 3.0], 5);

L.control.layers(baseLayers, overlays).addTo(map);

/**
 * events handlers
 */

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);
