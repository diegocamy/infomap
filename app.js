const botonBarrios = document.querySelector('#barrios');
const botonRecoleccion = document.querySelector('#recoleccion');

botonBarrios.addEventListener('click', mostrarBarrios);
botonRecoleccion.addEventListener('click', mostrarRecoleccion);


var mymap = L.map('mapid').setView([-30.898354, -55.538407], 14);


L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  accessToken: 'pk.eyJ1IjoiZGllZ29jYW15IiwiYSI6ImNrNDM1ZjN1OTA0ZTUzcHBrZmQzdTAzcnIifQ.sF3sou7RyTmc1Muj2L4FnA'
}).addTo(mymap);

const masterGroup = L.layerGroup();
masterGroup.addTo(mymap);

//GEOLOCALIZACION
mymap.locate({ setView: false });

function onLocationFound(e) {

  L.marker(e.latlng).addTo(mymap)
    .bindPopup("Tu ubicación");

} mymap.on('locationfound', onLocationFound);

function onLocationError(e) {
  alert(e.message);
}

mymap.on('locationerror', onLocationError);


function mostrarBarrios() {

  masterGroup.clearLayers();

  const barriox = L.geoJSON(barrios, {
    style: function (feature) {
      return {
        color: '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6),
        weight: 2,
        opacity: 1,
        dashArray: 3,
        fillOpacity: 0.2
      }
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup(feature.properties.NOMBRE)
    }
  }
  );

  masterGroup.addLayer(barriox);

}

function mostrarRecoleccion() {

  masterGroup.clearLayers();

  const barriox = L.geoJSON(recoleccion, {
    style: function (feature) {
      return {
        color: '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6),
        weight: 2,
        opacity: 1,
        dashArray: 3,
        fillOpacity: 0.2
      }
    },
    onEachFeature: function (feature, layer) {
      var popup = `<p style="text-align:center">Días de recolección: ${feature.properties.OBSERVACIO}<br>
      Turno: ${feature.properties.TURNO}<p>`;
      layer.bindPopup(popup)
      //layer.on('click', function () {
      //})
    }
  }
  );

  masterGroup.addLayer(barriox);

}



