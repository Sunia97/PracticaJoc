
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
    data: {json: JSON.stringify(structure)},//Com que el path està posat al html ho detecta com una variable
    complete: function(result){
     console.log("GAME SAVED. Success on POST from Server (uploadStructureJSON)");
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

//Per descarregar del servidor l'estructura de mapes. Es filtra la resposta,
//(parse de response) i es retorna a través de la funció callback que rebem
//com a paràmetre i que permet treballar amb la resposta AJAX.
function downloadStructureJSON(slot, callback) {

  $.ajax({
    type: 'get',
    url: url_server + token + "&slot=" + slot,
    success: function(response){
      responseParsed = JSON.parse(response);
      console.log("Parse de response fet, es crida al callback:");
      callback(responseParsed);
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
    }
  });
}


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
      var gameJSON = JSON.parse(result);// la variable estructuraJSON conté un array de nivells, on cada nivell és un array d'arrays (mapa 10x10)
      return gameJSON;
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
      var gameJSON = JSON.parse(result);// la variable estructuraJSON conté un array de nivells, on cada nivell és un array d'arrays (mapa 10x10)
      return gameJSON;
    }
  });

}

//Funció que carrega un nivell del map i on es desenvolupa tot el joc amb crides a funcions
function loadNewLevel(level, gameJSON) {

  switch(level) {
    case -2:
      mapa = gameJSON[0].map;//Assigno el nivell (mapa) que toca a mapa
      player.estadoPartida.direccion = gameJSON[0].direction;
      setPlayer ();

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

function setPlayer () {
  for (x = 0; x < 11; x++) {
    for (y = 0; y < 11; y++) {

      alert(mapa[x][y] );
      if (mapa[x][y] == "P"){
        player.estadoPartida.x = x;
        player.estadoPartida.y = y;
      }
      //mapaToImg(x, y);
    }
  }
}
