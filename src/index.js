
import Phaser from 'phaser';

import PlayScene from './PlayScene';
import PreloadScene from './PreloadScene';

const config = {
  type: Phaser.AUTO,
  width: 1400,
  height: 440,
  pixelArt: true,
  transparent: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: [PreloadScene, PlayScene]
};

new Phaser.Game(config);