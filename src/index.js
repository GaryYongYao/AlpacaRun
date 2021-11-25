
import Phaser from 'phaser';

import React from 'react'
import { render } from 'react-dom'

import TitleComponent from './TitleComponent';
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

render(
  <TitleComponent />,
  document.getElementById('title-container')
)

render(
  <ReactComponent />,
  document.getElementById('board-container')
)
