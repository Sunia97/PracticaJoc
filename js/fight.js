var attacker = player;
var attacked = enemigo;

//Lluita entre l'enemic i el jugador que retorna true si el jugador guanya. .
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

function attacks () {
  var attack = attacker.ataque - attacked.defensa;

  if (attack > 0) {
    attacked.vida -= attack;
  }

  if (attacker == player) {

    console.log ("PLAYER " + attack);
    attacker = enemigo;
    attacked = player;
  } else {

    console.log ("ENEMY" + attack);
    attacked = enemigo;
    attacker = player;
  }
  return attack;

  //TODO Mostrar titol d'atac (que no apareix fins que es mor)
  //$("#alerta-info").text("Jugador: " + player.vida + " Enemigo: " + enemigo.vida);
  //$("#alerta-info").show();
  //wait (3);
  //$("#alerta-info").hide();
}

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

function wait(seconds){
   var start = new Date().getTime();
   var end = start;
   while(end < start + seconds * 1000) {
     end = new Date().getTime();
  }
}
