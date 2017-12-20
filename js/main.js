
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


/*
FUNCIONS
 */

/* Inicializar el juego */
function iniciarJuego() {

  var slot = "nueva";     // NOTE: Variarà segons el que vulgui el jugador (partida 1 o 2 guardada) o "nueva" a l'inici

  uploadMapFirstTime();   // NOTE: Només per pujar els mapes al servidor. Comentar-ho quan ja estan pujats!
  getListOfGames();

/*
  downloadMapsJSON(slot);

  var level = -2;

  while (level < 1) {
    level = loadNewLevel(level);
  }*/

  //S'acaba el joc quan s'arriba al nivell 1
}

/* Convierte lo que hay en el mapa en un archivo de imagen */
function mapaToImg(x, y) {
  /* TODO */
}
