function randomizeObjects (max) {
  num = Math.floor(Math.random() * Math.floor(max));
  switch (num) {
      case 0:
        return "path_garrote.png";
        break;
      case 1:
        return "path_hacha.png";
        break;
      case 2:
        return "path_sack.png";
        break;
    }
}
