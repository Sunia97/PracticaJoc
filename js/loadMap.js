/*
VARIABLES GLOBALS
 */
var url = "http://puigpedros.salleurl.edu/pwi/pac4/token/";
var token = "fa8a1b5b-55ff-4f03-b5f9-be0a95e713e2";


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
}
