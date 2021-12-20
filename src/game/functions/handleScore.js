function handleScore(runGame) {
  runGame.time.addEvent({
    delay: 1000/10,
    loop: true,
    callbackScope: runGame,
    callback: () => {
      if (!runGame.isGameRunning) { return; }

      runGame.score++;
      runGame.gameSpeed += 0.01

      if (runGame.score % 100 === 0) {
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
