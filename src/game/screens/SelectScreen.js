function SelectScreen(runGame) {
  const { height, width } = runGame.game.config;
  
  runGame.selectScreen = runGame.add.container(width / 2, 0).setDepth(100).setAlpha(0)
  runGame.selectBackground = runGame.add.image(0, 0, 'background').setOrigin(0.5, 0)
  runGame.selectText = runGame.add.text(0, 50, "SELECT YOUR ALPACA", { fill: "#fec062", fontSize: 35, fontFamily: 'nokiafc22' })
    .setOrigin(0.5, 0);
  runGame.alpaca01 = runGame.add.image(-300, height - 100, 'alpaca-01-idle')
    .setFlipX(true)
    .setAlpha(0.7)
    .setInteractive();
  runGame.alpaca02 = runGame.add.image(-100, height - 100, 'alpaca-02-idle')
    .setFlipX(true)
    .setAlpha(0.7)
    .setInteractive();
  runGame.alpaca03 = runGame.add.image(100, height - 100, 'alpaca-03-idle')
    .setFlipX(true)
    .setAlpha(0.7)
    .setInteractive();
  runGame.alpaca04 = runGame.add.image(300, height - 100, 'alpaca-04-idle')
    .setFlipX(true)
    .setAlpha(0.7)
    .setInteractive();
  runGame.selectScreen.add([ runGame.selectBackground, runGame.selectText, runGame.alpaca01, runGame.alpaca02, runGame.alpaca03, runGame.alpaca04 ])
}

export default SelectScreen;
