window.initMap = initMap;

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  // dark mode
  var theme = 'dark'
}
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
  // dark mode
  var theme = 'light'
}

if (theme == 'light') {
  document.querySelector("html").classList = "light";
}
else if (theme == 'dark') {
  document.querySelector("html").classList = "dark";
}

var os = navigator.userAgent;
if (os.includes('iPhone')) {
  var sistema = 'ios';
}
else if (os.includes('Android')) {
  var sistema = 'android';
}
else if(navigator.userAgent.indexOf("Chrome") > -1 ||
  navigator.userAgent.indexOf("Safari") > -1 ||
  navigator.userAgent.indexOf("Opera") > -1 ||
  navigator.userAgent.indexOf("Firefox") > -1 ||
  navigator.userAgent.indexOf("Macintosh") > -1) {
  var sistema = 'web'  
}
let system = document.getElementById('html')
system.classList.add(sistema);



let reviews = [];

function printForm() {
    var nombre = document.getElementById("coffee-name").value;
    var wifi = document.getElementById("wifi-rating").value;
    // var subida = document.getElementById("speed-up").value;
    // var bajada = document.getElementById("speed-down").value;
    var calle = document.getElementById("street").value;
    var barrio = document.getElementById("barrio").value;
    
    var formContents = "<br>***********************************************<br>" + 
                    "Nombe: " + nombre + "<br>" +
                    "WiFi : " + wifi + "/5<br>" +
                    // "Subida: " + subida + "mbps - Bajada: " + bajada + "mbps<br>" +
                    "Direccion: " + calle + "<br>" +
                    "Barrio: " + barrio + "<br>";
    // document.getElementById("formContents").innerHTML = formContents;

    let html = document.getElementById("html").innerHTML + formContents;
    // console.log(document.getElementById("html").innerHTML)
    document.getElementById("html").innerHTML = html;
}

function validateForm() {
    nombre = document.getElementById("coffee-name");
    wifi = document.getElementById("wifi-rating");
    

    if (nombre.value == "" || wifi.value == "" || barrio.value == "") {
      alert("Complete todos los campos.");
      return false;
    }
    else
    {
      InsertData();
    }
    return true;
}



document.getElementById("filtro_barrio").addEventListener("change", filterTable);
function filterTable() {
  var inputBarrio = document.getElementById("filtro_barrio");
  var filterBarrio = inputBarrio.value.toUpperCase();
  

  var table = document.getElementById("cafe-data");
  var rows = table.getElementsByTagName("tr");

  for (var i = 1; i < rows.length; i++) {
    var barrio = rows[i].getElementsByTagName("td")[3].textContent;
    var barrioMatch = barrio.toUpperCase().indexOf(filterBarrio) > -1;
    if (barrioMatch) {
      rows[i].style.display = "";
    } else {
      rows[i].style.display = "none";
    }
  }
}
function resetFilterTable() {
  var inputBarrio = document.getElementById("filtro_barrio");
  inputBarrio.value = "";
  filterTable();
}



/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.61315, lng: -58.37723 },
    zoom: 13,
    mapTypeControl: false,
  });
  const card = document.getElementById("pac-card");
  const input = document.getElementById("pac-input");
  console.log(input.children)
  const biasInputElement = document.getElementById("use-location-bias");
  const strictBoundsInputElement = document.getElementById("use-strict-bounds");
  const options = {
    fields: ["formatted_address", "geometry", "name"],
    strictBounds: false,
    types: ["establishment"],
  };

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);

  const autocomplete = new google.maps.places.Autocomplete(
    input,
    options
  );

  // Bind the map's bounds (viewport) property to the autocomplete object,
  // so that the autocomplete requests use the current map bounds for the
  // bounds option in the request.
  autocomplete.bindTo("bounds", map);

  const infowindow = new google.maps.InfoWindow();
  const infowindowContent = document.getElementById("infowindow-content");

  infowindow.setContent(infowindowContent);

  const marker = new google.maps.Marker({
    map,
    anchorPoint: new google.maps.Point(0, -29),
  });

  autocomplete.addListener("place_changed", () => {
    infowindow.close();
    marker.setVisible(false);

    const place = autocomplete.getPlace();

    if (!place.geometry || !place.geometry.location) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert(
        "No details available for input: '" + place.name + "'"
      );
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
    infowindowContent.children["place-name"].textContent = place.name;
    
    

    // console.log(place.name);
    const index = place.formatted_address.indexOf(', C', 0);
    // console.log(place.formatted_address.substring(0, index));
    window.myFunction(place.name,place.formatted_address.substring(0, index));

    infowindowContent.children["place-address"].textContent =
      place.formatted_address;
    infowindow.open(map, marker);
  });
}





