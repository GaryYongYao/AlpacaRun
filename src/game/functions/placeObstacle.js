function placeObstacle(runGame) {
  const obstacleNum = Math.floor(Math.random() * 7) + 1;
  const distance = Phaser.Math.Between(600, 900);

  let obstacle;
  if (obstacleNum > 6) {
    const enemyHeight = [20, 50];
    obstacle = runGame.obstacles.create(runGame.game.config.width + distance, runGame.game.config.height - enemyHeight[Math.floor(Math.random() * 2)] - 100, `enemy-bird`)
      .setOrigin(0, 1)
      .setScale(2.3)
    obstacle.play('enemy-bird-fly', 1);
    obstacle.body.height = obstacle.body.height / 1.5;
  } else if (obstacleNum === 6) {
    obstacle = runGame.obstacles.create(runGame.game.config.width + distance, runGame.game.config.height - 100, `enemy-pig`)
      .setOrigin(0, 1)
      .setScale(2)
    obstacle.play('enemy-pig-move', 1);

    obstacle.body.offset.y = +10;
  }  else if (obstacleNum === 5) {
    obstacle = runGame.obstacles.create(runGame.game.config.width + distance, runGame.game.config.height - 100, `enemy-witch`)
      .setOrigin(0, 1)
    obstacle.play('enemy-witch-move', 1);

    obstacle.body.offset.y = +10;
  } else {
    obstacle = runGame.obstacles.create(runGame.game.config.width + distance, runGame.game.config.height - 100, `obstacle-${obstacleNum}`)
      .setOrigin(0, 1);

    obstacle.body.offset.y = +10;
  }

  obstacle.setImmovable();
}

export default placeObstacle
