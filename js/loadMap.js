
var url_server = "http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=";
var token = "fa8a1b5b-55ff-4f03-b5f9-be0a95e713e2";


/*
FUNCIONS
 */
 function loadNewMap() {
   mapa = [[[]]];                                      // la variable mapa és un array de nivells, on cada nivell és un array d'arrays (mapa 10x10)
   $mapa.getJSON( url + token + "/partida/nueva");
   return mapa;     //Carregar tots els nivells a la variable mapa a l'inici del joc (partida nova)
}
 //Per penjar l'estructura json al servidor
 function uploadStructureFirstTime() {

  $.ajax({
    type: 'POST',
    url: url_server + token + "&slot=nueva",
    json: structure,//Com que el path està posat al html ho detecta com una variable
    success: function(result){
     console.log("Success on POST uploadMapFirstTime. Result:\n");
     console.log(result);
    }
  });

 }

 //Per descarregar la llista d'slots amb partides guardades
 function getListOfGames() {

   $.ajax({
      type: 'GET',
      url: url_server + token,
      success: function(result){
        console.log("Success on GET getListOfGames. Result:\n");
        console.log(result);
      }
   });

 }

function downloadStructureJSON(slot) {
  var estructuraJSON = "";// la variable estructuraJSON és un array de nivells, on cada nivell és un array d'arrays (mapa 10x10)

  $.ajax({
    type: 'GET',
    url: url_server + token + "&slot=" + slot,
    success: function(result){
      console.log("Success on GET downloadMapsJSON. Result:\n");
      console.log(result);
      estructuraJSON = result;
    }
  });

}


/*
function loadNewLevel(level) {

  var nextLevel;

  switch(level) {
    case -2:
      //TODO

      nextLevel = -1;
      break;
    case -1:
      //TODO

      nextLevel = 0;
      break;
    case 0:
      //TODO

      nextLevel = 1;
      break;
  }

  return nextLevel;
}
*/
