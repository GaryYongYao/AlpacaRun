function GameScreen(runGame) {
  const { height, width } = runGame.game.config;

  runGame.startTrigger = runGame.physics.add.sprite(20, 110).setOrigin(0, 1).setImmovable();
  runGame.goodWeather = runGame.add.image(700, 170, 'background').setInteractive(); 
  runGame.ground = runGame.add.tileSprite(0, height, width , 100, 'ground').setOrigin(0, 1).setInteractive();
  runGame.physics.add.existing(runGame.ground, true);
  runGame.alpaca = runGame.physics.add.sprite(20, height - 150, `alpaca-${runGame.spriteNumber}-idle`)
    .setCollideWorldBounds(false)
    .setGravityY(5000)
    .setBodySize(44, 92)
    .setDepth(1)
    .setInteractive()
    .setOrigin(0, 1);

  runGame.alpaca.flipX=true;

  runGame.scoreText = runGame.add.text(width, 10, "00000", {fill: "#FFF", font: '900 35px nokiafc22', resolution: 5})
    .setOrigin(1, 0)
    .setAlpha(0);
  
  runGame.highScoreText = runGame.add.text(0, 10, "00000", {fill: "#FFF ", font: '900 35px nokiafc22', resolution: 5})
    .setOrigin(1, 0)
    .setAlpha(0);
  
  runGame.multiplier = runGame.add.text(10, 10, "00000", {fill: "#FFF ", font: '900 35px nokiafc22', resolution: 5})
    .setAlpha(0);
    
  runGame.firework1 = runGame.add.sprite(400, 180, 'orange')
    .setDisplaySize(150, 150)
    .setAlpha(0)

  runGame.firework2 = runGame.add.sprite(200, 100, 'blue')
    .setDisplaySize(150, 150)
    .setAlpha(0)

  runGame.firework3 = runGame.add.sprite(1000, 120, 'orange')
    .setDisplaySize(150, 150)
    .setAlpha(0)

  runGame.firework4 = runGame.add.sprite(800, 90, 'blue')
    .setDisplaySize(150, 150)
    .setAlpha(0)
    
  runGame.firework5 = runGame.add.sprite(600, 150, 'green')
    .setDisplaySize(150, 150)
    .setAlpha(0)

  runGame.environment = runGame.add.group();
  /* runGame.environment.addMultiple([
    runGame.add.image(width / 2, 170, 'cloud'),
    runGame.add.image(width - 80, 80, 'cloud'),
    runGame.add.image((width / 1.3), 100, 'cloud')
  ]); */
  runGame.environment.setAlpha(0);
}

export default GameScreen;
