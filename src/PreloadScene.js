
import Phaser from 'phaser';

class PreloadScene extends Phaser.Scene {

  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.audio('jump', 'assets/jump.m4a');
    this.load.audio('hit', 'assets/hit.m4a');
    this.load.audio('reach', 'assets/reach.m4a');

    this.load.image('ground', 'assets/ground.png');
    this.load.image('alpaca-01-idle', 'assets/alpaca-01-idle.png');
    this.load.image('alpaca-02-idle', 'assets/alpaca-02-idle.png');
    this.load.image('alpaca-03-idle', 'assets/alpaca-03-idle.png');
    this.load.image('alpaca-04-idle', 'assets/alpaca-04-idle.png');
    this.load.image('dino-hurt', 'assets/dino-hurt.png');
    this.load.image('restart', 'assets/restart.png');
    this.load.image('game-over', 'assets/game-over.png');
    this.load.image('cloud', 'assets/cloud.png');
    this.load.image('background', 'assets/background.png');

    this.load.spritesheet('star', 'assets/stars.png', {
      frameWidth: 9, frameHeight: 9
    });

    this.load.spritesheet('moon', 'assets/moon.png', {
      frameWidth: 20, frameHeight: 40
    });

    this.load.spritesheet('alpaca-03', 'assets/alpaca-03-run.png', {
      frameWidth: 68,
      frameHeight: 92
    })

    this.load.spritesheet('dino-down', 'assets/dino-down.png', {
      frameWidth: 118,
      frameHeight: 94
    })

    this.load.spritesheet('enemy-bird', 'assets/enemy-bird.png', {
      frameWidth: 92,
      frameHeight: 77
    })

    this.load.image('obsticle-1', 'assets/obstacle_1.png')
    this.load.image('obsticle-2', 'assets/obstacle_2.png')
    this.load.image('obsticle-3', 'assets/cactuses_small_3.png')
    this.load.image('obsticle-4', 'assets/cactuses_big_1.png')
    this.load.image('obsticle-5', 'assets/cactuses_big_2.png')
    this.load.image('obsticle-6', 'assets/cactuses_big_3.png')
    this.load.image('start', 'assets/start.png');
  }

  create() {
    this.scene.start('PlayScene');
  }
}

export default PreloadScene;
