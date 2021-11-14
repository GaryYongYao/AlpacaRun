
import Phaser from 'phaser';

class PreloadScene extends Phaser.Scene {

  constructor() {
    super('PreloadScene');
  }

  preload() {
    // Audio
    ['jump', 'hit', 'reach'].map(item => this.load.audio(item, `assets/audio/${item}.m4a`));

    // Statics
    [
      'ground',  'background', 
      'restart', 
      'settings', 'settings-press', 
      'close', 'close-press', 
      'start', 'game-over'
    ].map(item => this.load.image(item, `assets/static/${item}.png`));

    // Alpaca
    this.load.image('alpaca-01-idle', 'assets/alpaca-01-idle.png');
    this.load.image('alpaca-02-idle', 'assets/alpaca-02-idle.png');
    this.load.image('alpaca-03-idle', 'assets/alpaca-03-idle.png');
    this.load.image('alpaca-04-idle', 'assets/alpaca-04-idle.png');
    this.load.image('alpaca-01-hurt', 'assets/alpaca-01-hurt.png');
    this.load.image('alpaca-02-hurt', 'assets/alpaca-02-hurt.png');
    this.load.image('alpaca-03-hurt', 'assets/alpaca-03-hurt.png');
    this.load.image('alpaca-04-hurt', 'assets/alpaca-04-hurt.png');

    this.load.spritesheet('alpaca-01', 'assets/alpaca-01-run.png', {
      frameWidth: 68,
      frameHeight: 92
    })

    this.load.spritesheet('alpaca-02', 'assets/alpaca-02-run.png', {
      frameWidth: 74,
      frameHeight: 92
    })

    this.load.spritesheet('alpaca-03', 'assets/alpaca-03-run.png', {
      frameWidth: 68,
      frameHeight: 92
    })

    this.load.spritesheet('alpaca-04', 'assets/alpaca-04-run.png', {
      frameWidth: 65,
      frameHeight: 92
    })

    // obstacle

    this.load.image('obstacle-1', 'assets/obstacle/obstacle-1.png')
    this.load.image('obstacle-2', 'assets/obstacle/obstacle-2.png')
    this.load.image('obstacle-3', 'assets/obstacle/obstacle-3.png')
    this.load.image('obstacle-4', 'assets/obstacle/obstacle-4.png')

    this.load.spritesheet('enemy-bird', 'assets/obstacle/enemy-bird.png', {
      frameWidth: 74.5,
      frameHeight: 75
    })

    this.load.spritesheet('enemy-bear', 'assets/obstacle/enemy-bear.png', {
      frameWidth: 74,
      frameHeight: 70
    })

    this.load.spritesheet('enemy-witch', 'assets/obstacle/enemy-witch.png', {
      frameWidth: 42,
      frameHeight: 75
    })
  }

  create() {
    this.scene.start('PlayScene');
  }
}

export default PreloadScene;
