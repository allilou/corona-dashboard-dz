var wilayat_url1 = 'https://services8.arcgis.com/yhz7DEAMzdabE4ro/arcgis/rest/services/Cas_confirme_wilaya/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Cas_confirm%20desc&outSR=102100&resultOffset=0&resultRecordCount=48&cacheHint=true';
var wilayat_url = 'https://services8.arcgis.com/yhz7DEAMzdabE4ro/arcgis/rest/services/Cas_confirme_view/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Cas_confirm%20desc&outSR=102100&resultOffset=0&resultRecordCount=48&cacheHint=true'
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var restFeaturesResponse = JSON.parse(this.responseText);
    updateMapView(restFeaturesResponse);
    featuresToHTMLTable(restFeaturesResponse);
  }
};

xmlhttp.open("GET", wilayat_url, true);
xmlhttp.send();
