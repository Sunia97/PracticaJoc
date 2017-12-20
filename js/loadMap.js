
var url2 = "http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=";
var token = "fa8a1b5b-55ff-4f03-b5f9-be0a95e713e2";


/*
FUNCIONS
 */

 //Per penjar l'estructura json al servidor
 function uploadMapFirstTime() {

   $.ajax({
     "type": "POST",
     "url" :url2 + token + "&slot=nueva",
     "json" :"src/structure.json",
     "success": function(result){
       console.log("Success on POST. Result:\n");
       console.log(result);
     }
   });

 }

 //Per descarregar la llista d'slots amb partides guardades
 function getListOfGames() {

   $.ajax({
      type: "GET",
      url : "http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=" + token,
      success: function(result){
        console.log("Success on GET. Result:\n");
        console.log(result);
      }
   });

 }
/*
function downloadMapsJSON(slot) {
  estructuraJSON = [];                                   // la variable mapa és un array de nivells, on cada nivell és un array d'arrays (mapa 10x10)


  //$mapa.getJSON( url + token + "/partida/nueva");     //Carregar tots els nivells a la variable mapa a l'inici del joc (partida nova)
}
*/

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
