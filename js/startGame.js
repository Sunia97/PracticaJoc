/**
 * carrega un nivell del map i on es desenvolupa tot el joc amb crides a funcions
 * @param {number} level Nivell a carregar
 */
function loadNewLevel(level, isNewGame) {
  playerWins = 0;
  if (level < 0) {
    readJSON (level);
    startGame(isNewGame); //carrega la posició del jugador i el que calgui
  }
}

/**
 * Llegeix la informació json i la guarda
 * @param {number} level Nivell a carregar
 */
function readJSON (level) {
  //Busca el mapa corresponent al nivell
  for (var z = 0; z < numNivells; z++) {
    if (gameJSON[z].level == level) {
      break;
    }
  }

  mapa = gameJSON[z].map;//Assigna el nivell (mapa) que toca a mapa

  //Fa la trasposada de la matriu Mapa, per guardar-la igual que al json.
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < i; j++) {
      var temp = mapa[i][j];
      mapa[i][j] = mapa[j][i];
      mapa[j][i] = temp;
    }
  }
}

/**
* Carrega una partida guardada.
**/
function startGame(isNewGame) {

  player.estadoPartida.direccion = gameJSON[2].estadoPartida.direccion;
  player.estadoPartida.x = gameJSON[2].estadoPartida.x;
  player.estadoPartida.y = gameJSON[2].estadoPartida.y;
  player.nombre = gameJSON[2].nombre;
  player.nivel = gameJSON[2].nivel;
  player.ataque = gameJSON[2].ataque;
<<<<<<< HEAD
  player.vida = gameJSON[2].vida;
=======
  player.defensa = gameJSON[2].defensa;
  player.manoderecha = gameJSON[2].manoderecha;
  player.manoizquierda = gameJSON[2].manoizquierda;
  player.mochila = gameJSON[2].mochila;
>>>>>>> 3582e7c1f5f2eb75e19a18c041db78d7a48ddb42

  propertiesHands();
  showAttributes(isNewGame);
  show();
}
<<<<<<< HEAD

/**
* Reinicia les propietats del jugador.
**/
function resetProperties () {
  level = -2;
  player.nivel = 1;
  player.ataque = 0;
  player.defensa = 0;
  player.manoderecha = "";
  player.manoizquierda ="";
  player.mochila = [];
  player.vida = 10;
  player.nivel = 1;
  player.xp = 0;
  player.ataque = 0;
  player.defensa = 0;
}
=======
>>>>>>> 3582e7c1f5f2eb75e19a18c041db78d7a48ddb42
