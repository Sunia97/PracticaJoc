<<<<<<< HEAD
var token = "fa8a1b5b-55ff-4f03-b5f9-be0a95e713e2";
var slot = "nueva";

/*Cargrega mapa de nivell*/
=======
/*
VARIABLES GLOBALS
 */
var url = "http://puigpedros.salleurl.edu/pwi/pac4/token/";
var token = "fa8a1b5b-55ff-4f03-b5f9-be0a95e713e2";
>>>>>>> efc7307c0714b6f9c4871ea5886b9214ea72e25b


<<<<<<< HEAD
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
=======
/*
FUNCIONS
 */
function loadNewMap() {
  mapa = [[[]]];                                      // la variable mapa és un array de nivells, on cada nivell és un array d'arrays (mapa 10x10)
  $mapa.getJSON( url + token + "/partida/nueva");     //Carregar tots els nivells a la variable mapa a l'inici del joc (partida nova)

}

function uploadMapFirstTime() {
  $.post( url + token + "/slot/nueva",    //URL del post
          data,                           // TODO: Path del fitxer json amb TOTS els nivells
          "json");                        //Datatype
>>>>>>> efc7307c0714b6f9c4871ea5886b9214ea72e25b
}
