//Funció que carrega un nivell del map i on es desenvolupa tot el joc amb crides a funcions
function loadNewLevel(level) {
  if (level < 0) {
    readJSON (level);
    startGame(); //carrega la posició del jugador i el que calgui
  }
}

function readJSON (level) {

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

//Mostra les dades del jugador i de l'equip.
function showAttributes () {
  var objects;
  for (var i=0; i < player.mochila; i++) {
    objects += "<li>";
    objects += player.mochila [i];
    objects += "<li>";
  }

  $("#objects").text(objects);
  $("#lives").text(player.vida);
  $("#level").text(player.nivel);
  $("#attack").text(player.ataque);
  $("#defending").text(player.defensa);
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

  refreshWeapons();
  showAttributes();
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

  checkGame(x, y);
}

//Rep la casella que el jugaor té davant
function checkGame(x, y) {

  if (mapa[x][y] == "E") {
    fight();
  }

  //Si està mort:
  if (player.vida <= 0) {
    estatPartida = 1;
    //alert("has perdut!");
    // TODO: que passa quan perd?
  } else {

    //TODO Cal fer per baixar de nivell
    if (mapa[x][y] == "D") {
      level++;
      console.log("PORTA PER PUJAR DE NIVELL AL " + level);

      //puja de nivell
      loadNewLevel(level);
    }
  }
}

//Actualitza el nivell, defensa i atac del jugador
function updatePlayer () {
  //XP acumulats d'altres nivells.
  var xp = 0;
  for (i = player.nivel; i > 1; i--) {
    xp += player.nivel * 10;
  }

  //El jugador puja de nivell
  if (player.xp >= 10 * (player.nivel + 1) + xp) {
    player.nivel ++;
    player.defensa ++;
    player.vida += player.nivel * 10;
    console.log("PUJA NIVELL " + player.nivel);
  }

  //Cada dos nivells es puja 1 d'atac
  if (player.nivel % 2 == 0) {
    player.ataque ++;
  }

  showAttributes();
}

//Lluita entre l'enemic i el jugador.
function fight () {
  var attacker = 1; //1 si ataca el jugador, -1 si ataca l'enemic.

  //torns d'atac mentre cap dels dos mor
  while (player.vida > 0 && enemigo.vida > 0) {
    //TODO Es crea bucle infinit si l'enemic té atac i defensa = 0
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
    player.xp += enemigo.xp;
    player.mochila.push (enemigo.objetos);
    refreshWeapons();
  }

  updatePlayer ();
}

//Segons les armes que té a les mans actualitza atac i defensa.
function refreshWeapons() {

  var object_right = objetos[player.manoderecha];
  player.ataque = object_right.ataque;
  player.defensa = object_right.defensa;

  var object_left = objetos[player.manoizquierda];
  player.ataque += object_left.ataque;
  player.defensa += object_left.defensa;
}
