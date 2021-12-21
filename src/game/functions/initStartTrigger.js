import Cookies from 'js-cookie';

function initStartTrigger(runGame) {
  const { width, height } = runGame.game.config;
  console.log(runGame.startTrigger.y)
  runGame.physics.add.overlap(runGame.startTrigger, runGame.alpaca, () => {
    if (runGame.startTrigger.y === 10) {
      runGame.startTrigger.body.reset(0, height - 100);
      return;
    }
    console.log('lol')

    runGame.startTrigger.disableBody(true, true);

    const startEvent =  runGame.time.addEvent({
      delay: 1000/60,
      loop: true,
      callbackScope: runGame,
      callback: () => {
        console.log('start')
        runGame.startScreen.setAlpha(0);
        runGame.alpaca.setY(height - 200);
        runGame.alpaca.setAlpha(1); 
        runGame.alpaca.setVelocityX(80);
        // runGame.alpaca.play('alpaca-run', true);

        if (runGame.ground.width >= 1000) {
          runGame.ground.width = width;
          runGame.isGameRunning = true;
          runGame.alpaca.setVelocityX(0);
          runGame.scoreText.setAlpha(1);
          runGame.environment.setAlpha(1);
    
          const highScore = Cookies.get('highScore');
          if (highScore) {
            runGame.highScoreText.x = runGame.scoreText.x - runGame.scoreText.width - 20;
            runGame.highScoreText.setText(`HI ${highScore}`);
            runGame.highScoreText.setAlpha(1);
          }

          startEvent.remove();
        }
      }
    });
  }, null, runGame)
}

export default initStartTrigger
