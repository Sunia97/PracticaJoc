
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

//Per descarregar del servidor l'estructura de mapes en objecte json i retorna-lo.
function downloadStructureJSON(slot) {

  $.ajax({
    type: 'GET',
    url: url_server + token + "&slot=" + slot,
    success: function(result){
      console.log("Success on GET downloadMapsJSON. Result:\n");
      console.log(result);
      var gameJSON = JSON.parse(result);// la variable estructuraJSON conté un array de nivells, on cada nivell és un array d'arrays (mapa 10x10)
      return gameJSON;
    }
  });
}

/*
//Funció per a fer una crida de guardar una partida
function saveGame() {

}
*/

//Funció que carrega un nivell del map i on es desenvolupa tot el joc amb crides a funcions
function loadNewLevel(level, gameJSON) {

  switch(level) {
    case -2:
      mapa = gameJSON[0].map;//Assigno el nivell (mapa) que toca a mapa

      //TODO


      level = -1;
      return level;//Un cop superat nivell
    case -1:
      mapa = gameJSON[1].map;//Assigno el nivell (mapa) que toca a mapa

      //TODO


      level = 0;//Un cop superat nivell
      return level;
    case 0:
      mapa = gameJSON[2].map;//Assigno el nivell (mapa) que toca a mapa

      //TODO


      level = 1;//Un cop superat nivell
      return level;
  }
}
