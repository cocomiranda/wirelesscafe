let reviews = [];

function printForm() {
    var nombre = document.getElementById("coffee-name").value;
    var wifi = document.getElementById("wifi-rating").value;
    var subida = document.getElementById("speed-up").value;
    var bajada = document.getElementById("speed-down").value;
    var calle = document.getElementById("street").value;
    var numero = document.getElementById("nro").value;
    var barrio = document.getElementById("barrio").value;
    
    var formContents = "<br>***********************************************<br>" + 
                    "Nombe: " + nombre + "<br>" +
                    "WiFi : " + wifi + "/5<br>" +
                    "Subida: " + subida + "mbps - Bajada: " + bajada + "mbps<br>" +
                    "Direccion: " + calle + " " + numero+ "<br>" +
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
    else {
        printForm()
    }

    return true;
  }

