
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

  uploadStructureFirstTime();   // NOTE: Només per pujar els mapes al servidor. Comentar-ho quan ja estan pujats!
  getListOfGames();             // NOTE: Només és comprovació. No influeix en joc.

  var gameJSON = downloadStructureJSON(slot);//game es el json object amb tots els nivells

  var level = -2;

  while (level < 1) {
    level = loadNewLevel(level, gameJSON);
  }
  //S'acaba el joc quan s'arriba al nivell 1


  mapa = [["##########"],["#········#"],["#········#"],["#········#"],["#········#"],["#····#···#"],["#····P···#"],["#········#"],["#········#"],["##########"]];
  for (x = 0; x<11; x++) {
    for (y = 0; y<11; y++) {
      alert(mapa[x][y] );
      if (mapa[x][y] == "P"){
        player.estadoPartida.x = x;
        player.estadoPartida.y = y;
      }
      //mapaToImg(x, y);
    }
  }
}

function move (moviment) {
switch (player.estadoPartida.direccion) {
    case 0:
      if (moviment == "forward") player.estadoPartida.y--;
      else player.estadoPartida.y++;
      break;
    case 1:
      if (moviment == "forward") player.estadoPartida.y++;
      else player.estadoPartida.y--;
      break;
    case 2:
      if (moviment == "forward") player.estadoPartida.x++;
      else player.estadoPartida.x--;
      break;
    case 3:
      if (moviment == "forward") player.estadoPartida.x--;
      else player.estadoPartida.x++;
      break;
  }
}

function rotate (rotacio) {
  switch (player.estadoPartida.direccion) {
      case 0:
        if (rotacio == "left") player.estadoPartida.direccion = 3;
        else player.estadoPartida.direccion = 2;
        break;
      case 1:
        if (rotacio == "left") player.estadoPartida.direccion = 2;
        else player.estadoPartida.direccion = 3;
        break;
      case 2:
        if (rotacio == "left") player.estadoPartida.direccion = 0;
        else player.estadoPartida.direccion = 1;
        break;
      case 3:
        if (rotacio == "left") player.estadoPartida.direccion = 1;
        else player.estadoPartida.direccion = 0;
        break;
    }
}

function show () {
  x = player.estadoPartida.x;
  y = player.estadoPartida.y;

  switch (player.estadoPartida.direccion) {
      case 0:
        pintaPosicion(x, y--);
        break;
      case 1:
        pintaPosicion(x, y++);
        break;
      case 2:
        pintaPosicion(x++, y);
        break;
      case 3:
        pintaPosicion(x--, y);
        break;
    }
}
/* Convierte lo que hay en el mapa en un archivo de imagen */
function mapaToImg(x, y) {
  if (mapa[x][y] == "#") {
    return "media/images/dungeon_wall.png";
  }
  if (mapa[x][y] == ".") {
    return "media/images/dungeon_step.png";
  }
  /*if (mapa[x][y] == "D") {
    return "media/images/dungeon_door.png";
  }
  if (mapa[x][y] == "E") {
    return "media/images/dungeon_enemy.png";
  }*/
}
