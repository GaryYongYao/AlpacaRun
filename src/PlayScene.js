import Phaser from 'phaser';
import Cookies from 'js-cookie';
import { getAlpacaIDs, getURLId, calibration } from './utils';
import { GameScreen, OverScreen, SelectScreen, StartScreen } from './game/screens'
import { initAnims, initColliders, initStartTrigger } from './game/functions/initiate'
import { handleInputs, handleScore, placeObstacle } from './game/functions'

class PlayScene extends Phaser.Scene {

  constructor() {
    super('PlayScene');
  }

  create() {
    const { ethereum } = window
    
    this.ownedAlpaca = (ethereum || {}).selectedAddress ? getAlpacaIDs() : [];
    this.gs = 18;
    this.isGameRunning = false;
    this.respawnTime = 0;
    this.obsCount = 0;
    this.score = 0;
    this.spriteNumber = this.ownedAlpaca.length > 0 ? this.ownedAlpaca[0].token_id : '01';
    this.noStart  = false;
    this.frameTime = 0;
    this.calibrate = 0;
    this.csv = 0;
    this.disId = Cookies.get('disId');
    this.physics.world.setFPS(60);

    this.shareId = getURLId()

    if (this.shareId) {
      this.spriteNumber = this.shareId
    
      let url = new URL(window.location);
      url.searchParams.set('id', this.spriteNumber);
      Cookies.set('shareUrl', url.href);
    }

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

    this.time.addEvent({
      delay: 1000/10,
      loop: true,
      callbackScope: this,
      callback: () => {
        if (!this.isGameRunning) { return; }

        this.csv++;
      }
    })
  }

  update(time, delta) {
    if (!this.isGameRunning) { return; }
    this.frameTime += delta;

    if (this.frameTime > 16) {  
      this.frameTime = 0;

      calibration(this)

      this.ground.tilePositionX += this.gs;
      Phaser.Actions.IncX(this.obstacles.getChildren(), -this.gs);
      Phaser.Actions.IncX(this.environment.getChildren(), - 0.5);
  
      this.respawnTime += 16.5 * this.gs * 0.08;
      if (this.respawnTime >= 1500 && this.obsCount < 20) {
        this.obsCount++;
        placeObstacle(this);
        this.respawnTime = 0;
      } else if (this.obsCount > 19 && this.respawnTime >= 3000) {
        this.obsCount = 0;
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
        // this.alpaca.play('alpaca-run', true);
      }
    }
  }
}

export default PlayScene;
