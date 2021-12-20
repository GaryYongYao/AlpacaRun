function ObstacleLoad(load) {
  load.image('obstacle-1', 'assets/obstacle/obstacle-1.png')
  load.image('obstacle-2', 'assets/obstacle/obstacle-2.png')
  load.image('obstacle-3', 'assets/obstacle/obstacle-3.png')
  load.image('obstacle-4', 'assets/obstacle/obstacle-4.png')

  load.spritesheet('enemy-bird', 'assets/obstacle/enemy-bird.png', {
    frameWidth: 74.5,
    frameHeight: 75
  })

  load.spritesheet('enemy-bear', 'assets/obstacle/enemy-bear.png', {
    frameWidth: 74,
    frameHeight: 70
  })

  load.spritesheet('enemy-witch', 'assets/obstacle/enemy-witch.png', {
    frameWidth: 42,
    frameHeight: 75
  })
}

export default ObstacleLoad;
