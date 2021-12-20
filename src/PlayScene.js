import Phaser from 'phaser';
import { getAlpacaIDs } from './utils';
import { GameScreen, OverScreen, SelectScreen, StartScreen } from './game/screens'
import { initAnims, initColliders, initStartTrigger } from './game/functions/initiate'
import { handleInputs, handleScore, placeObstacle } from './game/functions'

class PlayScene extends Phaser.Scene {

  constructor() {
    super('PlayScene');
  }

  create() {
    this.ownedAlpaca = getAlpacaIDs();
    this.gameSpeed = 18;
    this.isGameRunning = false;
    this.respawnTime = 0;
    this.score = 0;
    this.spriteNumber = '01'
    this.noStart  = false

    this.jumpSound = this.sound.add('jump', {volume: 0.2});
    this.hitSound = this.sound.add('hit', {volume: 0.2});
    this.reachSound = this.sound.add('reach', {volume: 0.2});
    
    GameScreen(this);
    StartScreen(this);
    SelectScreen(this);
    OverScreen(this);

    this.obstacles = this.physics.add.group();

    initAnims(this);
    initStartTrigger(this);
    initColliders(this);
    handleInputs(this);
    handleScore(this);
  }

  update(time, delta) {
    if (!this.isGameRunning) { return; }

    this.ground.tilePositionX += this.gameSpeed;
    Phaser.Actions.IncX(this.obstacles.getChildren(), -this.gameSpeed);
    Phaser.Actions.IncX(this.environment.getChildren(), - 0.5);

    this.respawnTime += delta * this.gameSpeed * 0.08;
    if (this.respawnTime >= 1500) {
      placeObstacle(this);
      this.respawnTime = 0;
    }

    this.obstacles.getChildren().forEach(obstacle => {
      if (obstacle.getBounds().right < 0) {
        this.obstacles.killAndHide(obstacle);
      }
    })

    this.environment.getChildren().forEach(env => {
      if (env.getBounds().right < 0) {
        env.x = this.game.config.width + 30;
      }
    })

    if (this.alpaca.body.deltaAbsY() > 5) {
      this.alpaca.anims.stop();
      this.alpaca.setTexture(`alpaca-${this.spriteNumber}`, 0);
    } else {
      this.alpaca.play('alpaca-run', true);
    }
  }
}

export default PlayScene;
