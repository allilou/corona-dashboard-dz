
function updateMapView(obj) {

    var mapFeatures = obj["features"];
    out = '';

    function getWilayaData(wilayaID) {
        for (let ii = 0; ii < mapFeatures.length; ii++) {
            if (mapFeatures[ii].attributes.WILAYA == wilayaID)
                return mapFeatures[ii].attributes;
        }
    }

    // Updating Wilaya Layer from MSRHP Dashboard
    for (let i = 0; i < wilaya.features.length; i++) {
        let wilayaData = getWilayaData(wilaya.features[i].properties.num);
        wilaya.features[i].properties.infected = wilayaData.Cas_confirm ;
        if (wilayaData.Cas_confirm == 0) {
            wilaya.features[i].properties.fill = "#DAE5F0" ;
            wilaya.features[i].properties.fillOpacity = 0.0 ;    
        }
        else if (wilayaData.Cas_confirm > 0 && wilayaData.Cas_confirm < 10) {
            wilaya.features[i].properties.fill = "#D3DEEA" ;
            wilaya.features[i].properties.fillOpacity = 0.7 ;    
        }
        else if (wilayaData.Cas_confirm >= 10 && wilayaData.Cas_confirm < 30) {
            wilaya.features[i].properties.fill = "#82A0BF" ;
            wilaya.features[i].properties.fillOpacity = 0.7 ;    
        }
        else if (wilayaData.Cas_confirm >= 30 && wilayaData.Cas_confirm < 50) {
            wilaya.features[i].properties.fill = "#6083A7" ;
            wilaya.features[i].properties.fillOpacity = 0.7 ;    
        }
        else if (wilayaData.Cas_confirm >= 50 && wilayaData.Cas_confirm < 100) {
            wilaya.features[i].properties.fill = "#426890" ;
            wilaya.features[i].properties.fillOpacity = 0.7 ;    
        }
        else if (wilayaData.Cas_confirm >= 100 && wilayaData.Cas_confirm < 300) {
            wilaya.features[i].properties.fill = "#264C74" ;
            wilaya.features[i].properties.fillOpacity = 0.7 ;    
        }
        else if (wilayaData.Cas_confirm >= 300) {
            wilaya.features[i].properties.fill = "#0B2949" ;
            wilaya.features[i].properties.fillOpacity = 0.7 ;    
        }

    }


    // Updating Cities Layer from MSRHP Dashboard
    for (let i = 0; i < villes.features.length; i++) {
        let wilayaData = getWilayaData(villes.features[i].properties.num);
        villes.features[i].properties.infected = wilayaData.Cas_confirm ;


    }

 /**
 * Base Layers 
 */

    var layerOSM = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
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

        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            // click: zoomToFeature
        });
    }

    // document.getElementById("details").innerHTML = wilaya.features[8].infected; 

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
            + "<tr> <td> <b>Ville : </b></td> <td>" + feature.properties.CITY_NAME + "</td></tr>"
            + "<tr> <td> <b>Infectés : </b></td> <td>" + feature.properties.infected + "</td></tr>"
            + "</table>";

        if (feature.properties && feature.properties.popupContent) {
            popupContent += feature.properties.popupContent;
        }

        layer.bindPopup(popupContent);

    }

    function getVilleSymbolWeight(infectedCount) {
        if (infectedCount== 0) {
            return 0;
        }
        else if (infectedCount> 0 && infectedCount<= 10) {   
            return 2
        }
        else if (infectedCount>= 10 && infectedCount< 30) {
            return 5;
        }
        else if (infectedCount>= 30 && infectedCount< 50) {
            return 10;
        }
        else if (infectedCount> 50 && infectedCount<= 100) {
            return 20;
        }
        else if (infectedCount> 100 && infectedCount<= 300) {
            return 30;
        }
        else if (infectedCount > 100) {
            return 40;
        }
    }

    var layerVilles = L.geoJSON([villes], {

        onEachFeature: onEachVilleFeature,

        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: getVilleSymbolWeight(feature.properties.infected), //feature.properties.infected,
                fillColor: "#D0E522",
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

    var mapLayerGroup = L.layerGroup([layerWilaya]); //, layerVilles]);

    var baseLayers = {
        "OpenStreetMap": layerOSM
    };

    var overlays = {
        "Villes": layerVilles,
        "Wilaya": layerWilaya
    };

    var map = L.map('map', { layers: [layerWilaya] }).setView([28.0, 3.0], 5);
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

        var msg = props ? "<table style='width:100%'>"
            + "<tr> <td> <b>Wilaya : </b></td> <td>" + props.name + "</td></tr>"
            + "<tr> <td>" + props.name_ar + "</td><td><b> : ولاية  </b></td></tr>"
            + "<tr> <td> " + props.infected + "</td><td><b> : العدوى </b></td></tr>"
            + "</table>"
            : 'Hover over a wilaya';

        this._div.innerHTML = msg;
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

    // map.on('click', onMapClick);

} // UpdateMapView
