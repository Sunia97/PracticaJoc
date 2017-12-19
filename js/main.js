/*
VARIABLES GLOBALS
 */

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

  uploadMapFirstTime();   // NOTE: Només s'utilitza el primer cop, després comentar funció.

  loadNewMap();

}

/* Convierte lo que hay en el mapa en un archivo de imagen */
function mapaToImg(x, y) {
  /* TODO */
}
