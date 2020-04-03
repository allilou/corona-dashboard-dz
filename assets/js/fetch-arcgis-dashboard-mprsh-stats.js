// Unused

var covid_deces = 'https://services8.arcgis.com/yhz7DEAMzdabE4ro/arcgis/rest/services/Cas_confirme_wilaya/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22D%C3%A9c%C3%A9s%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&outSR=102100&cacheHint=true';

var covid_wilayas_touche = 'https://services8.arcgis.com/yhz7DEAMzdabE4ro/arcgis/rest/services/Cas_confirme_wilaya/FeatureServer/0/query?f=json&where=Cas_confirm%3E0&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22count%22%2C%22onStatisticField%22%3A%22OBJECTID_1%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&outSR=102100&cacheHint=true';

var covid_total_cases = 'https://services8.arcgis.com/yhz7DEAMzdabE4ro/arcgis/rest/services/Cas_confirme_wilaya/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22active%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&outSR=102100&cacheHint=true';

var stats_tranche_age = 'https://services8.arcgis.com/yhz7DEAMzdabE4ro/arcgis/rest/services/Cas_confirme_wilaya/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22A1_25%22%2C%22outStatisticFieldName%22%3A%22A1_25%22%7D%2C%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22a25_34%22%2C%22outStatisticFieldName%22%3A%22a25_34%22%7D%2C%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22a35_44%22%2C%22outStatisticFieldName%22%3A%22a35_44%22%7D%2C%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22a45_59%22%2C%22outStatisticFieldName%22%3A%22a45_59%22%7D%2C%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22A_60%22%2C%22outStatisticFieldName%22%3A%22A_60%22%7D%2C%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22cinqantneuf%22%2C%22outStatisticFieldName%22%3A%22cinqantneuf%22%7D%2C%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22soixantedix%22%2C%22outStatisticFieldName%22%3A%22soixantedix%22%7D%2C%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22plus%22%2C%22outStatisticFieldName%22%3A%22plus%22%7D%5D&outSR=102100&cacheHint=true'

var ratio_male_female = 'https://services8.arcgis.com/yhz7DEAMzdabE4ro/arcgis/rest/services/Cas_confirme_wilaya/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Femelle%22%2C%22outStatisticFieldName%22%3A%22Femelle%22%7D%2C%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Males%22%2C%22outStatisticFieldName%22%3A%22Males%22%7D%5D&outSR=102100&cacheHint=true';

var stats_cumul_death_guerie = 'https://services8.arcgis.com/yhz7DEAMzdabE4ro/arcgis/rest/services/DZ_COVID/FeatureServer/2/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Cumul%20desc&outSR=102100&resultOffset=0&resultRecordCount=1&cacheHint=true';

/**
 * API REST du Dashboard du ministère de la santé 
 **/

var cumul_global1 = 'https://services8.arcgis.com/yhz7DEAMzdabE4ro/arcgis/rest/services/DZ_COVID/FeatureServer/2/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Report%20asc&outSR=102100&resultOffset=0&resultRecordCount=1000&cacheHint=true';
var cumul_global  = 'https://services8.arcgis.com/yhz7DEAMzdabE4ro/arcgis/rest/services/COVID_Death_Cumul/FeatureServer/2/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Report%20asc&outSR=102100&resultOffset=0&resultRecordCount=1000&cacheHint=true'

var xmlhttpCovidCases = new XMLHttpRequest();
xmlhttpCovidCases.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    let casesFeaturesResponse = JSON.parse(this.responseText);
    statsCumulTable(casesFeaturesResponse);
    statsCumulGraph(casesFeaturesResponse);
  }
};

xmlhttpCovidCases.open("GET", cumul_global, true);
xmlhttpCovidCases.send();


function statsCumulTable(obj) {
  let out = "<table width ='100%'>";
  out += "<tr> <th>Date report</th><th>Cumul</th><th>Décès</th><th>Gueris</th></tr>"

  var stats_cumul_global = [];

  for (let j = 0; j < obj["features"].length; j++) {
    let data = obj["features"][j].attributes;
    stats_cumul_global.push({ 'report' : obj["features"][j].attributes.Report, 
                              'cumul' : obj["features"][j].attributes.Cumul, 
                              'deces' : obj["features"][j].attributes.Death_cumul, 
                              'gueris' : obj["features"][j].attributes.gueris, 
                            });
  }

  for (let jj=0; jj < stats_cumul_global.length; jj++) {
    let options = {day: 'numeric', month: 'numeric', year: 'numeric'};
    let date = new Date(stats_cumul_global[jj].report);

    out += '<tr>' + '<td>' + date.toLocaleString('fr-FR', options) + '</td>'
                  + '<td>' +  stats_cumul_global[jj].cumul  + '</td>'
                  + '<td>' +  stats_cumul_global[jj].deces  + '</td>'
                  + '<td>' +  stats_cumul_global[jj].gueris + '</td>'
                  + '</tr>';
  }
 
  out += '</table>'
  document.getElementById("stats_cases").innerHTML = out;

}

function statsCumulGraph(obj) {

  var stats_report = [];
  var stats_cumul = [];
  var stats_deces = [];
  var stats_gueris = [];
  var stats_new = [];

  for (let jjj = 0; jjj < obj["features"].length; jjj++) {
    let options = {day: 'numeric', month: 'numeric', year: 'numeric'};
    let data = obj["features"][jjj].attributes;
    let date = new Date(data.Report);
    if (data.Cumul === null) continue;

    stats_report.push(date.toLocaleString('fr-FR', options));
    stats_cumul.push(data.Cumul);
    stats_deces.push(data.Death_cumul);
    stats_gueris.push(data.gueris);
    let prev_cases = jjj == 0 ? 0 : obj["features"][jjj-1].attributes.Cumul;
    stats_new.push(data.Cumul-prev_cases); 
  }

  var cumulCanevas = document.getElementById("graph-cumul");

  Chart.defaults.global.defaultFontFamily = "Lato";
  Chart.defaults.global.defaultFontSize = 12;
  
  var dataCumul = {
      label: "Cumul",
      data: stats_cumul,
      lineTension: 0,
      fill: false,
      borderColor: 'orange'
    };
  
  var dataDeces = {
      label: "Décès",
      data: stats_deces,
      lineTension: 0,
      fill: false,
    borderColor: 'magenta'
    };
  
    var dataGeuris = {
      label: "Guérison",
      data: stats_gueris,
      lineTension: 0,
      fill: false,
    borderColor: 'blue'
    };
  

  var covid_data = {
    labels: stats_report,
    datasets: [dataCumul, dataDeces, dataGeuris]
  };
  
  var chartOptions = {
    spanGaps: true,
    legend: {
      display: true,
      position: 'top',
      labels: {
        boxWidth: 80,
        fontColor: 'black'
      }
    }
  };
  
  var lineChart = new Chart(cumulCanevas, {
    type: 'line',
    data: covid_data,
    options: chartOptions
  });

  /***** */

  var newCasesCanevas = document.getElementById("graph-new");

  Chart.defaults.global.defaultFontFamily = "Lato";
  Chart.defaults.global.defaultFontSize = 12;
  
  var newCasesData = {
    label: 'Cas confirmés',
    data: stats_new,
    backgroundColor : 'green'
  };
  
  var barChart = new Chart(newCasesCanevas, {
    type: 'bar',
    data: {
      labels: stats_report,
      datasets: [newCasesData]
    }
  });

}