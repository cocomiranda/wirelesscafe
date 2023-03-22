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


let reviews = [];

function printForm() {
    var nombre = document.getElementById("coffee-name").value;
    var wifi = document.getElementById("wifi-rating").value;
    var subida = document.getElementById("speed-up").value;
    var bajada = document.getElementById("speed-down").value;
    var calle = document.getElementById("street").value;
    var barrio = document.getElementById("barrio").value;
    
    var formContents = "<br>***********************************************<br>" + 
                    "Nombe: " + nombre + "<br>" +
                    "WiFi : " + wifi + "/5<br>" +
                    "Subida: " + subida + "mbps - Bajada: " + bajada + "mbps<br>" +
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

    if (nombre.value == "" || wifi.value == "") {
      alert("Please fill out all fields.");
      return false;
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
    var barrio = rows[i].getElementsByTagName("td")[5].textContent;
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

