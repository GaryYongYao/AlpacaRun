function handleScore(runGame) {
  runGame.time.addEvent({
    delay: 1000/10,
    loop: true,
    callbackScope: runGame,
    callback: () => {
      if (!runGame.isGameRunning) { return; }

      runGame.score ++;
      runGame.gs += 0.01

      if (runGame.score % 500 === 0) {
        runGame.reachSound.play();

        runGame.tweens.add({
          targets: runGame.scoreText,
          duration: 50,
          repeat: 5,
          alpha: 0,
          yoyo: true
        })

        runGame.firework1.play('orange-firework').setAlpha(1)
        runGame.firework2.play('blue-firework', 50).setAlpha(1)
        runGame.firework3.play('orange-firework', 100).setAlpha(1)
        runGame.firework4.play('blue-firework', 150).setAlpha(1)
        runGame.firework5.play('green-firework', 200).setAlpha(1)

        
        setTimeout(() => {
          runGame.firework1.setAlpha(0)
          runGame.firework2.setAlpha(0)
          runGame.firework3.setAlpha(0)
          runGame.firework4.setAlpha(0)
          runGame.firework5.setAlpha(0)
        }, 2000)
        
      } else if (runGame.score % 100 === 0) {
        runGame.reachSound.play();

        runGame.tweens.add({
          targets: runGame.scoreText,
          duration: 100,
          repeat: 3,
          alpha: 0,
          yoyo: true
        })
      }

      runGame.calibrate++;

      const score = Array.from(String(runGame.score), Number);
      for (let i = 0; i < 5 - String(runGame.score).length; i++) {
        score.unshift(0);
      }

      runGame.scoreText.setText(score.join(''));
    }
  })
}

export default handleScore;
