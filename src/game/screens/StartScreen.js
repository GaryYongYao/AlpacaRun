function StartScreen(runGame) {
  const { height, width } = runGame.game.config;

  runGame.startScreen = runGame.add.container(width / 2, height / 4 - 50).setAlpha(1);
  runGame.startText = runGame.add.image(0, 0, 'start');
  runGame.instruction = runGame.add.text(0, 220, "Press SPACE / ALPACA to start", { fill: "#fec062", fontSize: 35, fontFamily: 'nokiafc22' })
    .setOrigin(0.5, 0);
  runGame.instruction2 = runGame.add.text(4, 224, "Press SPACE / ALPACA to start", { fill: "#000", fontSize: 35, fontFamily: 'nokiafc22' })
    .setOrigin(0.5, 0);
  runGame.settings = runGame.add.image(0, 80, 'settings').setInteractive();
  if (runGame.shareId) runGame.settings.setAlpha(0);
  runGame.settingsText = runGame.add.text(0, 105, "Pick Another ALPACA", { fill: "#fec062", fontSize: 20, fontFamily: 'nokiafc22' })
    .setOrigin(0.5, 0);
  runGame.settingsText2 = runGame.add.text(2, 108, "Pick Another ALPACA", { fill: "#000", fontSize: 20, fontFamily: 'nokiafc22' })
    .setOrigin(0.5, 0);
  runGame.startScreen.add([
    runGame.startText, runGame.instruction2, runGame.instruction, runGame.settings, runGame.settingsText2, runGame.settingsText
  ])
}

export default StartScreen;
