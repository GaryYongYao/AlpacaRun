function handleInputs(runGame) {
  runGame.restart.on('pointerdown', () => {
    runGame.alpaca.setVelocityY(0);
    runGame.alpaca.body.height = 92;
    runGame.alpaca.body.offset.y = 0;
    runGame.physics.resume();
    runGame.obstacles.clear(true, true);
    runGame.isGameRunning = true;
    runGame.gameOverScreen.setAlpha(0);
    runGame.anims.resumeAll();
  })
  runGame.restart.on('pointerover', () => {
    runGame.restartText.setAlpha(1);
    runGame.restartText2.setAlpha(1);
  })
  runGame.restart.on('pointerout', () => {
    runGame.restartText.setAlpha(0);
    runGame.restartText2.setAlpha(0);
  })

  const jump = () => {
    if (!runGame.alpaca.body.onFloor() || runGame.alpaca.body.velocity.x > 0 || runGame.noStart ) return; 

    if (runGame.gameOverScreen.alpha !== 1) {
      runGame.jumpSound.play();
      runGame.alpaca.body.height = 92;
      runGame.alpaca.body.offset.y = 0;
      runGame.alpaca.setVelocityY(-1600);
      runGame.alpaca.setTexture(`alpaca-${runGame.spriteNumber}`, 0);
    }
  }

  runGame.input.keyboard.on('keydown-SPACE', jump)
  runGame.alpaca.on('pointerdown', jump)
  runGame.ground.on('pointerdown', jump)
  runGame.goodWeather.on('pointerdown', jump)

  runGame.settings.on('pointerdown', async () => {
    runGame.noStart = true;
    runGame.settings.setTexture('settings-press');
    runGame.settings.disableInteractive();
    runGame.selectScreen.setAlpha(1);
  })
  runGame.settings.on('pointerover', () => {
    runGame.settingsText.setAlpha(1);
    runGame.settingsText2.setAlpha(1);
  })
  runGame.settings.on('pointerup', () => runGame.settings.setTexture('settings'))
  runGame.settings.on('pointerout', () => {
    runGame.settings.setTexture('settings');
    runGame.settingsText.setAlpha(0);
    runGame.settingsText2.setAlpha(0);
  })

  runGame.overSettings.on('pointerdown', async () => {
    runGame.noStart = true;
    runGame.overSettings.setTexture('settings-press');
    runGame.overSettings.disableInteractive();
    runGame.selectScreen.setAlpha(1);
  })
  runGame.overSettings.on('pointerover', () => {
    runGame.overSettingsText.setAlpha(1);
    runGame.overSettingsText2.setAlpha(1);
  })
  runGame.overSettings.on('pointerup', () => runGame.overSettings.setTexture('settings'))
  runGame.overSettings.on('pointerout', () => {
    runGame.overSettings.setTexture('settings');
    runGame.overSettingsText.setAlpha(0);
    runGame.overSettingsText2.setAlpha(0);
  })

  const alpaNo = ['01', '02', '03', '04'];

  alpaNo.map(n => {
    runGame[`alpaca${n}`].on('pointerdown', async () => {
      runGame.spriteNumber = n;

      runGame.alpaca.setTexture(`alpaca-${runGame.spriteNumber}-idle`, 0);
      await runGame.anims.remove('alpaca-run')
      await runGame.anims.create({
        key: 'alpaca-run',
        frames: runGame.anims.generateFrameNumbers(`alpaca-${runGame.spriteNumber}`, {start: 0, end: 1}),
        frameRate: 5,
        repeat: -1
      })
      runGame.noStart = false;
      runGame.settings.setInteractive();
      runGame.overSettings.setInteractive();
      runGame.selectScreen.setAlpha(0);
    })

    runGame[`alpaca${n}`].on('pointerover', () => runGame[`alpaca${n}`].setAlpha(1))

    runGame[`alpaca${n}`].on('pointerout', () => runGame[`alpaca${n}`].setAlpha(0.7))
  })
}

export default handleInputs;
