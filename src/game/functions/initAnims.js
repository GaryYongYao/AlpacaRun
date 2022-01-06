function initAnims(runGame) {
  /* runGame.anims.create({
    key: 'alpaca-run',
    frames: runGame.anims.generateFrameNumbers(`alpaca-${runGame.spriteNumber}`, {start: 0, end: 1}),
    frameRate: 5,
    repeat: -1
  }) */

  runGame.anims.create({
    key: 'blue-firework',
    frames: runGame.anims.generateFrameNumbers('blue', {start: 0, end: 56}),
    frameRate: 24,
    repeat: 1
  })

  runGame.anims.create({
    key: 'green-firework',
    frames: runGame.anims.generateFrameNumbers('green', {start: 0, end: 53}),
    frameRate: 24,
    repeat: 1
  })

  runGame.anims.create({
    key: 'orange-firework',
    frames: runGame.anims.generateFrameNumbers('orange', {start: 0, end: 56}),
    frameRate: 24,
    repeat: 1
  })

  runGame.anims.create({
    key: 'enemy-bird-fly',
    frames: runGame.anims.generateFrameNumbers('enemy-bird', {start: 0, end: 3}),
    frameRate: 6,
    repeat: -1
  })

  runGame.anims.create({
    key: 'enemy-pig-move',
    frames: runGame.anims.generateFrameNumbers('enemy-pig', {start: 0, end: 8}),
    frameRate: 12,
    repeat: -1
  })

  runGame.anims.create({
    key: 'enemy-witch-move',
    frames: runGame.anims.generateFrameNumbers('enemy-witch', {start: 0, end: 5}),
    frameRate: 6,
    repeat: -1
  })
}

export default initAnims
