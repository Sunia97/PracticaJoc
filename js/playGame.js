//Funció que carrega un nivell del map i on es desenvolupa tot el joc amb crides a funcions
function loadNewLevel(level, gameJSON) {

    readJSON (level, gameJSON);
    startGame(); //carrega la posició del jugador i el que calgui
    //return level;//Un cop superat nivell
}

function readJSON (level, gameJSON) {

  //Busca el mapa corresponent al nivell
  for (var z = 0; z < gameJSON.size; z++) {
    if (gameJSON[z].level == level) {
      break;
    }
  }

  player.estadoPartida.direccion = gameJSON[z].direction;
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
  fi = 0;
  estatPartida = 0; //indica l'estat de la partida: 0 = jugador viu, 1 = sense vides, 2 = èxit!

  //Busca la posició del jugador
  for (y = 0; y < 11 && fi == 0; y++) {
    for (x = 0; x < 11 && fi == 0; x++) {
      if (mapa[y][x] == "P") {
        player.estadoPartida.x = x;
        player.estadoPartida.y = y;
        fi = 1;
      }
    }
  }

  show();
}

function show () {
  x = player.estadoPartida.x;
  y = player.estadoPartida.y;

  switch (player.estadoPartida.direccion) {
      case 0:
        pintaPosicion(x, --y);
        break;
      case 1:
        pintaPosicion(x, ++y);
        break;
      case 2:
        pintaPosicion(++x, y);
        break;
      case 3:
        pintaPosicion(--x, y);
        break;
  }

  if (mapa[x][y] == "E") {
    fight();
  }

  checkGame(player.estadoPartida);
}

function checkGame(estatPartida) {
  //Si està mort:
  if (player.vida <= 0) {
    estatPartida = 1;
    alert("has perdut!");
    // TODO: que passa quan perd?
  }
  /*else {
    alert("has superat el nivell -2");
    level = -1;
  }*/
}

function fight () {
  var attacker = 1; //1 si ataca el jugador, -1 si ataca l'enemic.

  //torns d'atac mentre cap dels dos mor
  while (player.vida > 0 && enemigo.vida > 0) {
    //Ataca el jugador
    if (attacker > 0) {
      attack = player.ataque - enemigo.defensa;

      if (attack >= 0) {
        enemigo.vida -= attack;
      }
    } else {
      //Ataca l'enemic
      attack = enemigo.ataque - player.defensa;

      if (attack >= 0) {
        player.vida -= attack;
      }
    }
    attacker = - attacker;
  }

  if (player.vida <= 0) {
    console.log("JUGADOR MORT");
  }

  if (enemigo.vida <= 0) {
    console.log("ENEMIC MORT");
    player.mochila.push (enemigo.objetos);
    player.xp += enemigo.xp;
  }
}
