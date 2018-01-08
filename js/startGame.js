//Funció que carrega un nivell del map i on es desenvolupa tot el joc amb crides a funcions
function loadNewLevel(level) {
  if (level < 0) {
    readJSON (level);
    startGame(level); //carrega la posició del jugador i el que calgui
  }
}

function readJSON (level) {
  //Busca el mapa corresponent al nivell
  // Utilitzem numNivells ja que gameJSON.size no funcionava.
  for (var z = 0; z < numNivells; z++) {
    if (gameJSON[z].level == level) {
      break;
    }
  }
  player.estadoPartida.direccion = gameJSON[2].estadoPartida.direccion;

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

function startGame() {
  //Busca la posició del jugador
  fi = 0;
  for (x = 0; x < 10 && fi == 0; x++) {
    for (y = 0; y < 10 && fi == 0; y++) {
      if (mapa[x][y] == "P") {
        player.estadoPartida.x = x;
        player.estadoPartida.y = y;
        fi = 1;
      }
    }
  }

  propertiesHands();
  showAttributes();
  show();
}

function startGame(level) {
  player.estadoPartida.x = gameJSON[2].estadoPartida.x;
  player.estadoPartida.y = gameJSON[2].estadoPartida.y;
  propertiesHands();
  showAttributes(level);
  show();
}


function restart() {
  resetProperties ();
  //forcem el pintat dels dos botons de les mans.
  $("#right_hand").text("Mano Derecha");
  $("#left_hand").text("Mano Izquierda");

  objects = 0;
  left_weapon = 0;
  right_weapon = 0;
  loadNewLevel(-2);
}

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
