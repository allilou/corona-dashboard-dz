/**
 * Base Layers 
 */

var layerOSM  = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1
});


/**
 * Vector Layers  
 */

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    layerWilaya.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

 function onEachWilayaFeature(feature, layer) {

    // var popupContent = "<table style='width:100%'>"
    //                             + "<tr> <td> <b>Wilaya : </b></td> <td>"      + feature.properties.name     + "</td></tr>"
    //                             + "<tr> <td>"  + feature.properties.name_ar  + "</td><td><b> : ولاية  </b></td></tr>"
    //                             + "<tr> <td> " + feature.properties.infected + "</td><td><b> : العدوى </b></td></tr>"
    //                             + "</table>";

    // if (feature.properties && feature.properties.popupContent) {
    //     popupContent += feature.properties.popupContent;
    // }

    // layer.bindPopup(popupContent);    
    
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        // click: zoomToFeature
    });
}

var layerWilaya = L.geoJSON([wilaya], {

    style: function (feature) {
        return feature.properties && {
            fillColor: feature.properties.fill, 
            fillOpacity: feature.properties.fillOpacity,
            color: "#999",
            weight: 1
         };
    },

    onEachFeature: onEachWilayaFeature,

});


function onEachVilleFeature(feature, layer) {

    var popupContent = "<table style='width:100%'>"
                                + "<tr> <td> <b>Ville : </b></td> <td>"      + feature.properties.CITY_NAME     + "</td></tr>"
                                + "<tr> <td> <b>Infectés : </b></td> <td>"    + feature.properties.infected     + "</td></tr>"
                                + "</table>";

    if (feature.properties && feature.properties.popupContent) {
        popupContent += feature.properties.popupContent;
    }

    layer.bindPopup(popupContent);


}

var layerVilles = L.geoJSON([villes], {

    onEachFeature: onEachVilleFeature,

		pointToLayer: function (feature, latlng) {
			return L.circleMarker(latlng, {
				radius: feature.properties.infected,
				fillColor: "#E74C3C",
				color: "#000",
				weight: feature.properties.infected == 0 ? 0 : 1,
				opacity: feature.properties.infected == 0 ? 0 : 1,
				fillOpacity: feature.properties.infected == 0 ? 0 : 0.8
			});
		}

});

/**
 * map initialisation
 */

var mapLayerGroup = L.layerGroup([layerWilaya, layerVilles]);

var baseLayers = {
    "OpenStreetMap": layerOSM
};

var overlays = {
    "Wilaya" : layerWilaya,
    "Villes" : layerVilles    
};

var map = L.map('map', {layers: [layerWilaya, layerVilles]}).setView([28.0, 3.0], 5);
map.addLayer(layerOSM);

L.control.layers(baseLayers, overlays).addTo(map);

/**
 * 
 */

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {

    var msg =  props ? "<table style='width:100%'>"
                                + "<tr> <td> <b>Wilaya : </b></td> <td>"      + props.name     + "</td></tr>"
                                + "<tr> <td>"  + props.name_ar  + "</td><td><b> : ولاية  </b></td></tr>"
                                + "<tr> <td> " + props.infected + "</td><td><b> : العدوى </b></td></tr>"
                                + "</table>"
            : 'Hover over a wilaya';

    this._div.innerHTML = msg ;
};

info.addTo(map);


/**
 * events handlers
 */

var popup = L.popup();

function onMapClick(e) {
    // "You clicked the map at " + e.latlng.toString()
    var content = " <form action=''> \
                        <label for='fname'>First name:</label><br> \
                        <input type='text' id='fname' name='fname' value='John'><br> \
                        <label for='lname'>Last name:</label><br> \
                        <input type='text' id='lname' name='lname' value='Doe'><br><br> \
                        <input type='submit' value='Submit'> \
                    </form> ";
    popup
        .setLatLng(e.latlng)
        .setContent(content)
        .openOn(map);
}

map.on('click', onMapClick);
