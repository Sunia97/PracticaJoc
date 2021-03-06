
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
     console.log("Success on POST from Server (uploadStructureJSON)");
    }
  });

 }

 function saveGameStructureJSON(slot) {

   $.ajax({
     type: 'POST',
     url: url_server + token + "&slot=" + slot,
     data: {json: JSON.stringify(gameJSON)},//Com que el path està posat al html ho detecta com una variable
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
      console.log("Success on GET from Server (downloadStructureJSON");
      responseParsed = JSON.parse(response);
      //console.log("Parse de response fet, es crida al callback:");
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

function deleteAndResetStructureJSON(slot) {

  $.ajax({
    type: 'DELETE',
    url: url_server + token + "&slot=" + slot,
    success: function(result){
      console.log("Success on DELETE from Server (deleteStructureJSON)\n");
      uploadStructureJSON(slot);
    }
  });
}

function deleteAndSaveGameJSON(slot) {
  $.ajax({
    type: 'DELETE',
    url: url_server + token + "&slot=" + slot,
    success: function(result){
      console.log("Success on DELETE from Server (deleteStructureJSON)\n");
      saveGameStructureJSON(slot);
    }
  });
}
