var token = "fa8a1b5b-55ff-4f03-b5f9-be0a95e713e2";
var slot = "nueva";

/*Cargrega mapa de nivell*/

//Classes per les caselles (excepte pels enemics i els jugador)
var wall = {
  img:"media/images/dungeon_wall.png",         //Imatge que es mostrarà en la posició
  action:"Block"                               //Accions de la classe (per exemple: bloquejar usuari, cridar a una funció per iniciar un combat, superar nivell...)
};

var door = {
  img:"media/images/dungeon_door.png",
  action:"Exit"
};

var air = {
  img:"media/images/dungeon_step.png",
  action:null
};

function loadMap() {
  //var mapa = [][];
  //readTextFile("src/mapa-2.txt");
  readFile();
}

function readFile () {
  var json = JSON.parse ("src/mapa-2.json");

  $.post("http://puigpedros.salleurl.edu/pwi/pac4/token/" + token + "/slot/" + slot, json);
  alert("prova");
  //jQuery.ajax("POST", "http://puigpedros.salleurl.edu/pwi/pac4/token/" + token + "/slot/" + slot, "src/mapa-2.json");
}
