function initAnims(runGame) {
  runGame.anims.create({
    key: 'alpaca-run',
    frames: runGame.anims.generateFrameNumbers(`alpaca-${runGame.spriteNumber}`, {start: 0, end: 1}),
    frameRate: 5,
    repeat: -1
  })

  runGame.anims.create({
    key: 'enemy-dino-fly',
    frames: runGame.anims.generateFrameNumbers('enemy-bird', {start: 0, end: 3}),
    frameRate: 6,
    repeat: -1
  })

  runGame.anims.create({
    key: 'enemy-bear-move',
    frames: runGame.anims.generateFrameNumbers('enemy-bear', {start: 0, end: 3}),
    frameRate: 6,
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
