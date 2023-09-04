let mapa;
let geocoder;
let directionsService;
let directionsRenderer;

function initMap() {
  mapa = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.8916185, lng: -56.1940286 }, // Coordenadas iniciales (Torre de Comunicaciones)
    zoom: 15,
  });
  geocoder = new google.maps.Geocoder();
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(mapa);

  const torreDeComunicaciones = new google.maps.Marker({
    position: { lat: -34.8916185, lng: -56.1940286 },
    map: mapa,
    title: "Torre de las comunicaciones de Antel",
  });
}


function calcularRuta() {
  const direccionUsuario = document.getElementById("direccion").value;

  geocoder.geocode({ address: direccionUsuario }, function (results, status) {
    if (status === "OK") {
      const destino = results[0].geometry.location;

      const solicitudRuta = {
        origin: direccionUsuario, // La dirección ingresada por el usuario
        destination: "Agraciada 2424 Salto", // Reemplaza con la dirección de tu destino fijo
        travelMode: "DRIVING", // Puedes cambiar esto a "WALKING" o "TRANSIT" si lo deseas
      };

      directionsService.route(solicitudRuta, function (result, status) {
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