numNivells = 3; //Nombre de nivells que tenim al joc

//Funció que carrega un nivell del map i on es desenvolupa tot el joc amb crides a funcions
function loadNewLevel(level) {
  if (level < 0) {
    readJSON (level);
    startGame(); //carrega la posició del jugador i el que calgui
  }
}

function readJSON (level) {
  //Busca el mapa corresponent al nivell
  console.log("hola");
  // Utilitzem numNivells ja que gameJSON.size no funcionava.
  for (var z = 0; z < numNivells; z++) {
    if (gameJSON[z].level == level) {
      break;
    }
  }
  player.estadoPartida.direccion = gameJSON[z].direction;
  mapa= gameJSON[z].map;//Assigna el nivell (mapa) que toca a mapa

  //Fa la trasposada de la matriu Mapa, per guardar-la igual que al json.
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < i; j++) {
      var temp = mapa[i][j];
      mapa[i][j] = mapa[j][i];
      mapa[j][i] = temp;
    }
  }
  console.log(level);
  console.log(mapa);
}

//l jugador i de l'equip.
function showAttributes () {
  var objects = "";

  for (var i = 0; i < player.mochila.length; i++) {
    addWeaponButton(player.mochila [i]);
  }

  $("#lives").text(player.vida);
  $("#level").text(player.nivel);
  $("#attack").text(player.ataque);
  $("#defense").text(player.defensa);
}

//Afegeix el botó d'una eina
function addWeaponButton (obj) {
  var object_button = "";
  object_button += "<button class='weapon'>" + obj;
  object_button += " Ataque: " + objetos[obj].ataque + " Defensa: " + objetos[obj].defensa;
  object_button += "</button>";

  $("#bag").append(object_button);
}

//Segons les armes que té a les mans actualitza atac i defensa.
function propertiesHands () {
  if (player.manoderecha != "") {
    var object_right = objetos[player.manoderecha];
    player.ataque = object_right.ataque;
    player.defensa = object_right.defensa;
  }

  if (player.manoizquierda != "") {
    var object_left = objetos[player.manoizquierda];
    player.ataque += object_left.ataque;
    player.defensa += object_left.defensa;
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
        console.log(x, y);
        fi = 1;
      }
    }
  }

  propertiesHands();
  showAttributes();
  show();
}

function show () {
  x = player.estadoPartida.x;
  y = player.estadoPartida.y;

  switch (player.estadoPartida.direccion) {
      case 0:
        pintaPosicion(x, y - 1);
        break;
      case 1:
        pintaPosicion(x, y + 1);
        break;
      case 2:
        pintaPosicion(x + 1, y);
        break;
      case 3:
        pintaPosicion(x - 1, y);
        break;
  }

  drawCompass(player.estadoPartida.direccion, 0, 0);
  checkGame(x, y);
}

//Rep la casella que el jugador té davant
function checkGame(x, y) {

  if (mapa[x][y] == "E") {
    esViu = fight();
    if (esViu == true) mapa[x][y] = "·";
  }

  updatePlayer ();

  //Si està mort:
  if (player.vida <= 0) {
    estatPartida = 1;
    alert("has perdut!");
    pintaImagen("you_lose.png", 0, 0);
    // TODO: que passa quan perd?
  } else {
    if (mapa[player.estadoPartida.x][player.estadoPartida.y] == "D") {
      if (confirm("Vols pujar de nivell?")) {
        able = false;
        level++;
        setTimeout(2000,pintaImagen("BruixolaE.png",0,0)); //TODO: cal canviar aquesta imatge per un "pujant al seguent nivell" o algo així.
        loadNewLevel(level);
      } else {
        alert("esperem veure't aviat");
        switch (player.estadoPartida.direccion) {
            case 0:
              player.estadoPartida.y++;
              break;
            case 1:
              player.estadoPartida.y--;
              break;
            case 2:
              player.estadoPartida.y--;
              break;
            case 3:
              player.estadoPartida.y++;
              break;
        }
        show();
      }
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
    player.defensa --;
    player.vida += player.nivel * 10;
    console.log("PUJA NIVELL " + player.nivel);
  }

  //Cada dos nivells es puja 1 d'atac
  if (player.nivel % 2 == 0) {
    player.ataque ++;
  }

}



/*
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
    return false;
  }

  if (enemigo.vida <= 0) {
    console.log("ENEMIC MORT");
    player.mochila.push (enemigo.objetos);
    player.xp += enemigo.xp;
    return true;

  }
}*/
