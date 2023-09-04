let mapa;
let geocoder;
let directionsService;
let directionsRenderer;

function initMap() {
  mapa = new google.maps.Map(document.getElementById("map"), { // Con esto creamos el mapa
    center: { lat: -34.8916185, lng: -56.1940286 }, // Coordenadas iniciales (Torre de Comunicaciones)
    zoom: 15,
  });
  geocoder = new google.maps.Geocoder();
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(mapa);

  const torreDeComunicaciones = new google.maps.Marker({ // Marcador para la torre
    position: { lat: -34.8916185, lng: -56.1940286 },
    map: mapa,
    title: "Torre de las Telecomunicaciones de Antel",
  });
}


function calcularRuta() {
  const direccionUsuario = document.getElementById("direccion").value; // donde el usuario escribe la localizacion

  geocoder.geocode({ address: direccionUsuario }, function (results, status) {
    if (status === "OK") {
      const destino = results[0].geometry.location; // el primer destino que recibe y muestra

      const solicitudRuta = { 
        origin: direccionUsuario, // La dirección que ingresa el usuario
        destination: "11800 Montevideo", 
        travelMode: "DRIVING", // Puede ser "WALKING" para trayecto a pie o "TRANSIT"
      };

      directionsService.route(solicitudRuta, function (result, status) { // muestra la ruta en el mapa
        if (status === "OK") {
          directionsRenderer.setDirections(result);
        } else {
          alert("No se pudo calcular la ruta: " + status);
        }
      });
    } else {
      alert("No se pudo encontrar la dirección: " + status);
    }
  });
}

console.log("En caso de no verse el mapa, o que alguna funcionalidad falle, se puede deber a que la API de google maps es gratuita por 90 días, y a día de hoy ya se ha vencido.")