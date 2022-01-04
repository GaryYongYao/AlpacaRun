function handleScore(runGame) {
  runGame.time.addEvent({
    delay: 1000/10,
    loop: true,
    callbackScope: runGame,
    callback: () => {
      if (!runGame.isGameRunning) { return; }

      runGame.score++;
      runGame.gameSpeed += 0.01

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
        runGame.firework2.playAfterDelay('blue-firework', 50).setAlpha(1)
        runGame.firework3.playAfterDelay('orange-firework', 100).setAlpha(1)
        runGame.firework4.playAfterDelay('blue-firework', 150).setAlpha(1)
        runGame.firework5.playAfterDelay('green-firework', 200).setAlpha(1)

        
        setTimeout(() => {
          runGame.firework1.stop().setAlpha(0)
          runGame.firework2.stop().setAlpha(0)
          runGame.firework3.stop().setAlpha(0)
          runGame.firework4.stop().setAlpha(0)
          runGame.firework5.stop().setAlpha(0)
        }, 2500)
        
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
      
      const score = Array.from(String(runGame.score), Number);
      for (let i = 0; i < 5 - String(runGame.score).length; i++) {
        score.unshift(0);
      }

      runGame.scoreText.setText(score.join(''));
    }
  })
}

export default handleScore;
