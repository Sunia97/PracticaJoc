
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

  var slot = "nueva";           // NOTE: Variarà segons el que vulgui el jugador (partida 1 o 2 guardada) o "nueva" a l'inici

  //uploadStructureJSON(slot);   // NOTE: Només per pujar els mapes al servidor. Comentar-ho quan ja estan pujats!
  //deleteStructureJSON(slot);
  getListOfGames();             // NOTE: Només és comprovació. No influeix en joc.

  // TODO: ENCARA NO FUNCIONA LA DESCARREGA DEL FITXER DEL SERVIDOR
  //var gameJSON = downloadStructureJSON(slot);//game es el json object amb tots els nivells

  // NOTE: TEMPORALMENT, UTILITZEM EL FITXER JSON LOCAL, NO EL DEL SERVIDOR
  var gameJSON = structure;

  var level = -2;

  while (level < 1) {
    level = loadNewLevel(level, gameJSON);
  }

  console.log("Partida acabada");
  //S'acaba el joc quan s'arriba al nivell 1
}

/* Convierte lo que hay en el mapa en un archivo de imagen */
function mapaToImg(x, y) {
  if (mapa[x][y] == "#") {
    return "dungeon_wall.png";
  }
  if (mapa[x][y] == ".") {
    return "dungeon_step.png";
  }
  /*if (mapa[x][y] == "D") {
    return "media/images/dungeon_door.png";
  }
  if (mapa[x][y] == "E") {
    return "media/images/dungeon_enemy.png";
  }*/
}
