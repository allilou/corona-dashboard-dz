
function featuresToHTMLTable(obj) {
    
    var out = '<table style="width:100%">';
    var i;
    var features = obj["features"];

    out += '<tr> \
    <th>WILAYA </th> \
    <th>NOM_WILAYA </th> \
    <th>wilayat </th> \
    <th>Cas_confirm </th> \
    <th>Décés </th> \
    <th>Récupér </th> \
    <th>active </th> \
    <th>Femelle </th> \
    <th>Males </th> \
    <th>Imported </th> \
    <th>Local </th> \
    <th>A1_25 </th> \
    <th>a25_34 </th> \
    <th>a35_44 </th> \
    <th>a45_59 </th> \
    <th>A_60 </th> \
    </tr>';

    for(i = 0; i < features.length; i++) {
        out += '<tr>' 
        + '<td>' + features[i].attributes["WILAYA"] + '</td>'
        + '<td>' + features[i].attributes["NOM_WILAYA"] + '</td>'
        + '<td>' + features[i].attributes["wilayat"] + '</td>'
        + '<td>' + features[i].attributes["Cas_confirm"] + '</td>'
        + '<td>' + features[i].attributes["Décés"] + '</td>'
        + '<td>' + features[i].attributes["Récupér"] + '</td>'
        + '<td>' + features[i].attributes["active"] + '</td>'
        + '<td>' + features[i].attributes["Femelle"] + '</td>'
        + '<td>' + features[i].attributes["Males"] + '</td>'
        + '<td>' + features[i].attributes["Imported"] + '</td>'
        + '<td>' + features[i].attributes["Local"] + '</td>'
        + '<td>' + features[i].attributes["A1_25"] + '</td>'
        + '<td>' + features[i].attributes["a25_34"] + '</td>'
        + '<td>' + features[i].attributes["a35_44"] + '</td>'
        + '<td>' + features[i].attributes["a45_59"] + '</td>'
        + '<td>' + features[i].attributes["A_60"] + '</td>'
        // + '<td>' + features[i].attributes["Date_rapport"] + '</td>'
        +'</tr>';
    }

    out += '</table>';

    document.getElementById("details").innerHTML = out;
    
}
