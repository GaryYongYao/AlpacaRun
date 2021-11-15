
import Phaser from 'phaser';

import React from 'react'
import ReactDOM from 'react-dom'

import PlayScene from './PlayScene';
import PreloadScene from './PreloadScene';
import ReactComponent from './ReactComponent';

const config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 440,
  pixelArt: true,
  transparent: true,
  parent: 'game-container',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: [PreloadScene, PlayScene]
};

new Phaser.Game(config);

ReactDOM.render(
  <ReactComponent />,
  document.getElementById('board-container')
)
