
var url_server = "http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=";
var token = "fa8a1b5b-55ff-4f03-b5f9-be0a95e713e2";


/*
FUNCIONS
 */

 //Per penjar l'estructura json al servidor (GUARDAR PARTIDA)
function uploadStructureJSON(slot) {

  $.ajax({
    type: 'POST',
    url: url_server + token + "&slot=" + slot,
    data: {json: structure},//Com que el path està posat al html ho detecta com una variable
    success: function(result){
     console.log("GAME SAVED. Success on POST from Server (uploadStructureJSON)");
     console.log(result);
    }
  });

 }

 //Per descarregar la llista d'slots amb partides guardades del servidor
 function getListOfGames() {

   $.ajax({
      type: 'GET',
      url: url_server + token,
      success: function(result){
        console.log("Success on GET from Server (getListOfGames). Result:\n");
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
      console.log("Success on GET from Server (downloadMapsJSON). Result:\n");
      console.log(result);
      //var gameJSON = [];
      //gameJSON = JSON.parse(result);// la variable gameJSON conté un array de nivells, on cada nivell és un array d'arrays (mapa 10x10)
      return result;
    }
  });
}

//Per eliminar estructura del slot del servidor
function deleteStructureJSON(slot) {

  $.ajax({
    type: 'DELETE',
    url: url_server + token + "&slot=" + slot,
    success: function(result){
      console.log("Success on DELETE from Server (deleteStructureJSON)\n");
      console.log(result);
    }
  });

}

//Funció que carrega un nivell del map i on es desenvolupa tot el joc amb crides a funcions
function loadNewLevel(level, gameJSON) {

  switch(level) {
    case -2:
      mapa = gameJSON[0].map;//Assigno el nivell (mapa) que toca a mapa

      //TODO

      console.log("Superat nivell -2");
      level = -1;
      return level;//Un cop superat nivell
    case -1:
      mapa = gameJSON[1].map;//Assigno el nivell (mapa) que toca a mapa

      //TODO

      console.log("Superat nivell -1");
      level = 0;//Un cop superat nivell
      return level;
    case 0:
      mapa = gameJSON[2].map;//Assigno el nivell (mapa) que toca a mapa

      //TODO

      console.log("Superat nivell 0");
      level = 1;//Un cop superat nivell
      return level;
  }
}
