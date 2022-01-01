function OverScreen(runGame) {
  const { height, width } = runGame.game.config;

  runGame.gameOverScreen = runGame.add.container(width / 2, 0).setAlpha(0).setDepth(99)
  runGame.gameOverText = runGame.add.image(0, 100, 'game-over');
  runGame.restart = runGame.add.image(-80, 200, 'restart').setInteractive();
  runGame.restartText = runGame.add.text(-80, 225, "Try Again?", { fill: "#fec062", fontSize: 20, fontFamily: 'nokiafc22' })
    .setOrigin(0.5, 0).setAlpha(0);
  runGame.restartText2 = runGame.add.text(-78, 228, "Try Again?", { fill: "#000", fontSize: 20, fontFamily: 'nokiafc22' })
    .setOrigin(0.5, 0).setAlpha(0);
  runGame.overSettings = runGame.add.image(80, 200, 'settings').setInteractive();
  if (runGame.shareId) runGame.overSettings.setAlpha(0);
  runGame.overSettingsText = runGame.add.text(80, 225, "Pick Another ALPACA", { fill: "#fec062", fontSize: 20, fontFamily: 'nokiafc22' })
    .setOrigin(0.5, 0).setAlpha(0);
  runGame.overSettingsText2 = runGame.add.text(82, 228, "Pick Another ALPACA", { fill: "#000", fontSize: 20, fontFamily: 'nokiafc22' })
    .setOrigin(0.5, 0).setAlpha(0);
  runGame.FinalScoreText = runGame.add.text(0, 255, 'Final Score: 0', { fill: "#fec062", fontSize: 30, fontFamily: 'nokiafc22' })
      .setOrigin(0.5, 0);
  runGame.FinalScoreText2 = runGame.add.text(2, 258, 'Final Score: 0', { fill: "#000", fontSize: 30, fontFamily: 'nokiafc22' })
      .setOrigin(0.5, 0);
  runGame.shareText = runGame.add.text(0, 300, 'Share Your Score', { fill: "#fec062", fontSize: 18, fontFamily: 'nokiafc22' })
      .setOrigin(0.5, 0);
  runGame.shareText2 = runGame.add.text(2, 303, 'Share Your Score', { fill: "#000", fontSize: 18, fontFamily: 'nokiafc22' })
      .setOrigin(0.5, 0);
  runGame.twitter = runGame.add.image(0, 340, 'twitter').setInteractive();
  runGame.gameOverBackground = runGame.add.rectangle(0, 0, width, height, '#000').setOrigin(0.5, 0).setAlpha(0.6)
  runGame.gameOverScreen.add([
    runGame.gameOverBackground, runGame.gameOverText, runGame.overSettingsText2, runGame.restartText2, runGame.restartText, runGame.overSettingsText, runGame.restart, runGame.overSettings, runGame.FinalScoreText2, runGame.FinalScoreText, runGame.shareText2, runGame.shareText, runGame.twitter
  ])
}

export default OverScreen;
