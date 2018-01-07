//FUNCIÓ PER GUARDAR PARTIDA
function saveGame (slotGuardar) {

  if (slotGuardar == 1 || slotGuardar == 2) {
    gameJSON[3] = player;
    deleteStructureJSON(slotGuardar);
    saveGameStructureJSON(slotGuardar);
  }

  $("#save-game-panel").hide();
  $("#game-saved-panel").show();
}

function loadGame (slotCarregar) {
  downloadStructureJSON (slotCarregar, function callback(result) {
    gameJSON = result;
    console.log("Partida carregada:");
    console.log(gameJSON[3]);
    loadNewLevel(gameJSON[3].estadoPartida.nivel);
    console.log("Callback fet. gameJSON carregat des del server.");
  });

  $("#load-game-panel").hide();
  $("#game-loaded-panel").show();
}

function showLoad() {
  $("#load-game-panel").show();
}

function showSave() {
  $("#save-game-panel").show();
}

function cancelSave() {
  $("#save-game-panel").hide();
}

function cancelLoad() {
  $("#load-game-panel").hide();
}

function hideSavedPanel() {
  $("#game-saved-panel").hide();
}

function hideLoadedPanel() {
  $("#game-loaded-panel").hide();
}
