var attacker = player; //Qui ataca
var attacked = enemigo; //Qui es defensa

/**
* Lluita entre l'enemic i el jugador que retorna 1 si el jugador guanya, 0 si
* hi ha empat i -1 si guanya l'enemic.
**/
function fight () {
  var playerWins = 1; //guanya el jugador

  //torns d'atac mentre cap dels dos mor
  while (player.vida > 0 && enemigo.vida > 0) {
    if (attacks() == 0) {
      playerWins = 0; //empat
      $("#alerta-pared").text("Empate");
      $("#alerta-pared").show();
      console.log("empat");
      break;
    }
  }

  //El jugador mor
  if (player.vida <= 0) {
    playerDies ();
  }

  //L'enemic mor
  if (enemigo.vida <= 0) {
    enemyDies ();
    console.log("ENEMIC MORT");
  }

  updatePlayer ();
  return playerWins;
}

/**
* Es mostra que el jugador ha mort.
**/
function playerDies (){
  playerWins = -1;
  $("#alerta-info").text("¡Has muerto! Haz click en Comenzar Partida.");
  $("#alerta-info").show();
  console.log("JUGADOR MORT");
  if (player.vida<0){
    player.vida = 0;
  }
  $("#lives").text(player.vida);
  pintaImagen("you_lose.png",0,0);
}

/**
* Es produeix un atac.
**/
function attacks () {
  var attack = attacker.ataque - attacked.defensa;

  if (attack > 0) {
    attacked.vida -= attack;
  }

  if (attacker == player) {
    console.log ("PLAYER ataca amb " + attack);
    attacker = enemigo;
    attacked = player;
  } else {
    console.log ("ENEMY ataca amb " + attack);
    attacked = enemigo;
    attacker = player;
  }
  return attack;
}

/**
* El jugador guanya el combat
**/
function enemyDies () {
  $("#alerta-info").text("¡Has vencido! Recibes: " + enemigo.objetos);
  $("#alerta-info").show();
  player.xp += enemigo.xp;

  //afegeix al jugador les eines de l'enemic
  var size = enemigo.objetos.length;

  for (var i = 0; i < size; i++) {
    var obj = enemigo.objetos[i];

    //Afegeix un nou objecte al jugador.
    $("#alerta-pared").text("Has ganado y obtienes sus armas.");
    $("#alerta-pared").show();
    getObject (obj);
    addWeaponButton(obj);
    $("#xp").text(player.xp);
  }
}
