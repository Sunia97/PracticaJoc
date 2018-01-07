numNivells = 3; //Nombre de nivells que tenim al joc
objects = 0;//Nombre d'objectes que té el jugador
left_weapon = 0;
right_weapon = 0;

//Funció que carrega un nivell del map i on es desenvolupa tot el joc amb crides a funcions
function loadNewLevel() {
  if (player.estadoPartida.nivel < 0) {
    readJSON ();
    startGame(); //carrega la posició del jugador i el que calgui
  }
}

function readJSON () {
  //Busca el mapa corresponent al nivell
  // Utilitzem numNivells ja que gameJSON.size no funcionava.
  for (var z = 0; z < numNivells; z++) {
    if (gameJSON[z].level == player.estadoPartida.nivel) {
      break;
    }
  }
  player.estadoPartida.direccion = gameJSON[3].estadoPartida.direccion;

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

  player.estadoPartida.x = gameJSON[3].estadoPartida.x;
  player.estadoPartida.y = gameJSON[3].estadoPartida.y;
/*
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
*/
  propertiesHands();
  showAttributes();
  show();
}

//l jugador i de l'equip.
function showAttributes () {
  if (player.estadoPartida.nivel == -2) {
    for (var i = 1; i < 9 && level == -2; i++) {
      $("#item" + i).text("ESPACIO LIBRE");
    }
  }

  $("#name").text(player.nombre);
  $("#lives").text(player.vida);
  $("#level").text(player.nivel);
  $("#attack").text(player.ataque);
  $("#defense").text(player.defensa);
}

//Afegeix el botó d'una eina
function addWeaponButton (obj) {
  var id_object = "#item" + (objects + 1);
  var object_button = "<br/><img class='weapon' src='media/images/objects/" + objetos[obj].path + "'>";

  objects ++;
  $(id_object).text(obj);
  $(id_object).append(object_button);
}

//Segons les armes que té a les mans actualitza atac i defensa.
function propertiesHands () {
  if (player.manoderecha != "") {
    var object_right = objetos[player.manoderecha];
    player.ataque = object_right.ataque;
    player.defensa = object_right.defensa;
  } else {
    player.ataque = 0;
    player.defensa = 0;
  }

  if (player.manoizquierda != "") {
    var object_left = objetos[player.manoizquierda];
    if (object_left.ataque == undefined) {
      player.ataque = 0;
      player.defensa = 0;
    } else {
      player.ataque += object_left.ataque;
      player.defensa += object_left.defensa;
    }
  }


  $("#attack").text(player.ataque);
  $("#defense").text(player.defensa);
}

function changeWeapon (id_hand) {
  var weapon = "";

  if (id_hand == "#left_hand") {
    left_weapon ++;
    if (left_weapon == right_weapon) left_weapon ++;

    if (left_weapon == player.mochila.length + 1) {
      $(id_hand).text("Mano Izquierda");
      left_weapon = 0;
      player.manoizquierda = "";
    } else {
      weapon = player.mochila[left_weapon - 1];
      player.manoizquierda = weapon;
      $(id_hand).text("Mano Izquierda");
      $(id_hand).append ("<br/><br/>" + weapon + "<br/><img class = 'row_center' src='media/images/objects/" + objetos[weapon].path + "'/>");

      if (weapon != "llave") {
        $(id_hand).append ("<br/>Ataque: " + objetos[weapon].ataque + "<br/>Defensa: " + objetos[weapon].defensa);
      }
    }
  } else {
    right_weapon ++;
    if (left_weapon == right_weapon) right_weapon ++;

    if (right_weapon == player.mochila.length + 1) {
      $(id_hand).text("Mano Derecha");
      right_weapon = 0;
      player.manoderecha = "";
    } else {
      weapon = player.mochila[right_weapon - 1];
      player.manoderecha = weapon;
      $(id_hand).text("Mano Derecha");
      $(id_hand).append ("<br/><br/>" + weapon + "<br/><img class = 'row_center' src='media/images/objects/" + objetos[weapon].path + "'/>");

      if (weapon != "llave") {
        $(id_hand).append ("<br/>Ataque: " + objetos[weapon].ataque + "<br/>Defensa: " + objetos[weapon].defensa);
      }
    }
  }

  propertiesHands();
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
    pintaImagen("you_lose.png", 0, 0);
    // TODO: que passa quan perd?
  } else {

    if (mapa[player.estadoPartida.x][player.estadoPartida.y] == "D") {
        checkDoor();
        show();
    }
    if (mapa[player.estadoPartida.x][player.estadoPartida.y] == "K") {
      checkKey();
      show();
    }
  }
}

function checkDoor () {
  if (player.manoderecha == "llave" || player.manoizquierda == "llave"){
    if (confirm("Vols pujar de nivell?")) {
      able = false;
      player.estadoPartida.nivel++;
      loadNewLevel();
    } else {
      alert("esperem veure't aviat");
      stepBackwards();
    }
  } else {
    $("#alerta-pared").text("Necessitas una llave para abrirla");
    $("#alerta-pared").show();
    stepBackwards();
  }
}

//movem el jugador una casella enrere
function stepBackwards () {
  switch (player.estadoPartida.direccion) {
      case 0:
        player.estadoPartida.y++;
        break;
      case 1:
        player.estadoPartida.y--;
        break;
      case 2:
        player.estadoPartida.x--;
        break;
      case 3:
        player.estadoPartida.x++;
        break;
    }
}

function checkKey () {
    player.mochila.push ("llave");
    addWeaponButton("llave");
    $("#alerta-pared").text("Has encontrado una llave.");
    $("#alerta-pared").show();
    mapa[player.estadoPartida.x][player.estadoPartida.y] = ".";
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

function restart() {
  resetProperties ();
  //forcem el pintat dels dos botons de les mans.
  $("#right_hand").text("Mano Derecha");
  $("#left_hand").text("Mano Izquierda");

  objects = 0;
  left_weapon = 0;
  right_weapon = 0;
  loadNewLevel();
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

function addWeaponEnemy (weapon){
  enemigo.objetos.push(weapon);
  enemigo.ataque += objetos[weapon].ataque;
  enemigo.defensa += objetos[weapon].defensa;
}
