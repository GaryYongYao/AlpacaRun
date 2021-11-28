import Phaser from 'phaser';
import Cookies from 'js-cookie';
import { getAlpacaIDs, graphRequest } from './utils';
import { encrypt } from './utils/crypto';
import { mutationUpdateRunScore } from './common';

class PlayScene extends Phaser.Scene {

  constructor() {
    super('PlayScene');
  }

  create() {
    const { height, width } = this.game.config;
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

    this.startTrigger = this.physics.add.sprite(20, 110).setOrigin(0, 1).setImmovable();
    this.goodWeather = this.add.image(700, 170, 'background').setInteractive(); 
    this.ground = this.add.tileSprite(0, height, width , 100, 'ground').setOrigin(0, 1).setInteractive();
    this.physics.add.existing(this.ground, true);
    this.alpaca = this.physics.add.sprite(20, height - 150, `alpaca-${this.spriteNumber}-idle`)
      .setCollideWorldBounds(false)
      .setGravityY(5000)
      .setBodySize(44, 92)
      .setDepth(1)
      .setInteractive()
      .setOrigin(0, 1);

    this.alpaca.flipX=true;

    this.scoreText = this.add.text(width, 10, "00000", {fill: "#FFF", font: '900 35px nokiafc22', resolution: 5})
      .setOrigin(1, 0)
      .setAlpha(0);

    
    this.highScoreText = this.add.text(0, 10, "00000", {fill: "#FFF ", font: '900 35px nokiafc22', resolution: 5})
      .setOrigin(1, 0)
      .setAlpha(0);

      this.environment = this.add.group();
      /* this.environment.addMultiple([
        this.add.image(width / 2, 170, 'cloud'),
        this.add.image(width - 80, 80, 'cloud'),
        this.add.image((width / 1.3), 100, 'cloud')
      ]); */
      this.environment.setAlpha(0);

    //start
    this.startScreen = this.add.container(width / 2, height / 4 - 50).setAlpha(1);
    this.startText = this.add.image(0, 0, 'start');
    this.instruction = this.add.text(0, 220, "Press SPACE / ALPACA to start", { fill: "#fec062", fontSize: 35, fontFamily: 'nokiafc22' })
      .setOrigin(0.5, 0);
    this.instruction2 = this.add.text(4, 224, "Press SPACE / ALPACA to start", { fill: "#000", fontSize: 35, fontFamily: 'nokiafc22' })
      .setOrigin(0.5, 0);
    this.settings = this.add.image(0, 80, 'settings').setInteractive();
    this.settingsText = this.add.text(0, 105, "Pick Another ALPACA", { fill: "#fec062", fontSize: 20, fontFamily: 'nokiafc22' })
      .setOrigin(0.5, 0).setAlpha(0);
    this.settingsText2 = this.add.text(2, 108, "Pick Another ALPACA", { fill: "#000", fontSize: 20, fontFamily: 'nokiafc22' })
      .setOrigin(0.5, 0).setAlpha(0);
    this.startScreen.add([
      this.startText, this.instruction2, this.instruction, this.settings, this.settingsText2, this.settingsText
    ])

    // Select
    this.selectScreen = this.add.container(width / 2, 0).setDepth(100).setAlpha(0)
    this.selectBackground = this.add.image(0, 0, 'background').setOrigin(0.5, 0)
    this.selectText = this.add.text(0, 50, "SELECT YOUR ALPACA", { fill: "#fec062", fontSize: 35, fontFamily: 'nokiafc22' })
      .setOrigin(0.5, 0);
    this.alpaca01 = this.add.image(-300, height - 100, 'alpaca-01-idle')
      .setFlipX(true)
      .setAlpha(0.7)
      .setInteractive();
    this.alpaca02 = this.add.image(-100, height - 100, 'alpaca-02-idle')
      .setFlipX(true)
      .setAlpha(0.7)
      .setInteractive();
    this.alpaca03 = this.add.image(100, height - 100, 'alpaca-03-idle')
      .setFlipX(true)
      .setAlpha(0.7)
      .setInteractive();
    this.alpaca04 = this.add.image(300, height - 100, 'alpaca-04-idle')
      .setFlipX(true)
      .setAlpha(0.7)
      .setInteractive();
    this.selectScreen.add([ this.selectBackground, this.selectText, this.alpaca01, this.alpaca02, this.alpaca03, this.alpaca04 ])

    //game over
    this.gameOverScreen = this.add.container(width / 2, 0).setAlpha(0).setDepth(99)
    this.gameOverText = this.add.image(0, 100, 'game-over');
    this.restart = this.add.image(-80, 200, 'restart').setInteractive();
    this.restartText = this.add.text(-80, 225, "Try Again?", { fill: "#fec062", fontSize: 20, fontFamily: 'nokiafc22' })
      .setOrigin(0.5, 0).setAlpha(0);
    this.restartText2 = this.add.text(-78, 228, "Try Again?", { fill: "#000", fontSize: 20, fontFamily: 'nokiafc22' })
      .setOrigin(0.5, 0).setAlpha(0);
    this.overSettings = this.add.image(80, 200, 'settings').setInteractive();
    this.overSettingsText = this.add.text(80, 225, "Pick Another ALPACA", { fill: "#fec062", fontSize: 20, fontFamily: 'nokiafc22' })
      .setOrigin(0.5, 0).setAlpha(0);
    this.overSettingsText2 = this.add.text(82, 228, "Pick Another ALPACA", { fill: "#000", fontSize: 20, fontFamily: 'nokiafc22' })
      .setOrigin(0.5, 0).setAlpha(0);
    this.gameOverBackground = this.add.rectangle(0, 0, width, height, '#000').setOrigin(0.5, 0).setAlpha(0.6)
    this.gameOverScreen.add([
      this.gameOverBackground, this.gameOverText, this.overSettingsText2, this.restartText2, this.restartText, this.overSettingsText, this.restart, this.overSettings
    ])

    this.obstacles = this.physics.add.group();

    this.initAnims();
    this.initStartTrigger();
    this.initColliders();
    this.handleInputs();
    this.handleScore();
  }

  initColliders() {
    this.physics.add.collider(this.ground, this.alpaca);
    this.physics.add.collider(this.alpaca, this.obstacles, () => {
      this.highScoreText.x = this.scoreText.x - this.scoreText.width - 20;

      const highScore = this.highScoreText.text.substr(this.highScoreText.text.length - 5);
      
      const code = encrypt({ tokenId: this.ownedAlpaca[0], score: Number(this.scoreText.text) })

      graphRequest(mutationUpdateRunScore, { code })
        .then(res => {
          const { updateRunScore } = res.data
          console.log(updateRunScore)
        })
        .catch(err =>  console.log(err))
      
      const newScore = Number(this.scoreText.text) > Number(highScore) ? this.scoreText.text : highScore;

      this.highScoreText.setText('HI ' + newScore);
      Cookies.set('highScore', newScore);
      this.highScoreText.setAlpha(1);

      this.physics.pause();
      this.isGameRunning = false;
      this.anims.pauseAll();
      this.alpaca.setTexture(`alpaca-${this.spriteNumber}-hurt`);
      this.respawnTime = 0;
      this.gameSpeed = 18;
      this.gameOverScreen.setAlpha(1);
      this.score = 0;
      this.hitSound.play();
    }, null, this);
  }

  initStartTrigger() {
    const { width, height } = this.game.config;
    this.physics.add.overlap(this.startTrigger, this.alpaca, () => {
      if (this.startTrigger.y === 10) {
        this.startTrigger.body.reset(0, height - 100);
        return;
      }

      this.startTrigger.disableBody(true, true);

      const startEvent =  this.time.addEvent({
        delay: 1000/60,
        loop: true,
        callbackScope: this,
        callback: () => {
          this.startScreen.setAlpha(0);
          this.alpaca.setY(height - 200);
          this.alpaca.setAlpha(1); 
          this.alpaca.setVelocityX(80);
          this.alpaca.play('alpaca-run', true);

          if (this.ground.width >= 1000) {
            this.ground.width = width;
            this.isGameRunning = true;
            this.alpaca.setVelocityX(0);
            this.scoreText.setAlpha(1);
            this.environment.setAlpha(1);
      
            const highScore = Cookies.get('highScore');
            if (highScore) {
              this.highScoreText.x = this.scoreText.x - this.scoreText.width - 20;
              this.highScoreText.setText(`HI ${highScore}`);
              this.highScoreText.setAlpha(1);
            }

            startEvent.remove();
          }
        }
      });
    }, null, this)
  }

  initAnims() {
    this.anims.create({
      key: 'alpaca-run',
      frames: this.anims.generateFrameNumbers(`alpaca-${this.spriteNumber}`, {start: 0, end: 1}),
      frameRate: 5,
      repeat: -1
    })

    this.anims.create({
      key: 'enemy-dino-fly',
      frames: this.anims.generateFrameNumbers('enemy-bird', {start: 0, end: 3}),
      frameRate: 6,
      repeat: -1
    })

    this.anims.create({
      key: 'enemy-bear-move',
      frames: this.anims.generateFrameNumbers('enemy-bear', {start: 0, end: 3}),
      frameRate: 6,
      repeat: -1
    })

    this.anims.create({
      key: 'enemy-witch-move',
      frames: this.anims.generateFrameNumbers('enemy-witch', {start: 0, end: 5}),
      frameRate: 6,
      repeat: -1
    })
  }

  handleScore() {
    this.time.addEvent({
      delay: 1000/10,
      loop: true,
      callbackScope: this,
      callback: () => {
        if (!this.isGameRunning) { return; }

        this.score++;
        this.gameSpeed += 0.01

        if (this.score % 100 === 0) {
          this.reachSound.play();

          this.tweens.add({
            targets: this.scoreText,
            duration: 100,
            repeat: 3,
            alpha: 0,
            yoyo: true
          })
        }

        const score = Array.from(String(this.score), Number);
        for (let i = 0; i < 5 - String(this.score).length; i++) {
          score.unshift(0);
        }

        this.scoreText.setText(score.join(''));
      }
    })
  }

  handleInputs() {
    this.restart.on('pointerdown', () => {
      this.alpaca.setVelocityY(0);
      this.alpaca.body.height = 92;
      this.alpaca.body.offset.y = 0;
      this.physics.resume();
      this.obstacles.clear(true, true);
      this.isGameRunning = true;
      this.gameOverScreen.setAlpha(0);
      this.anims.resumeAll();
    })
    this.restart.on('pointerover', () => {
      this.restartText.setAlpha(1);
      this.restartText2.setAlpha(1);
    })
    this.restart.on('pointerout', () => {
      this.restartText.setAlpha(0);
      this.restartText2.setAlpha(0);
    })

    const jump = () => {
      if (!this.alpaca.body.onFloor() || this.alpaca.body.velocity.x > 0 || this.noStart ) return; 

      if (this.gameOverScreen.alpha !== 1) {
        this.jumpSound.play();
        this.alpaca.body.height = 92;
        this.alpaca.body.offset.y = 0;
        this.alpaca.setVelocityY(-1600);
        this.alpaca.setTexture(`alpaca-${this.spriteNumber}`, 0);
      }
    }

    this.input.keyboard.on('keydown-SPACE', jump)
    this.alpaca.on('pointerdown', jump)
    this.ground.on('pointerdown', jump)
    this.goodWeather.on('pointerdown', jump)

    this.settings.on('pointerdown', async () => {
      this.noStart = true;
      this.settings.setTexture('settings-press');
      this.settings.disableInteractive();
      this.selectScreen.setAlpha(1);
    })
    this.settings.on('pointerover', () => {
      this.settingsText.setAlpha(1);
      this.settingsText2.setAlpha(1);
    })
    this.settings.on('pointerup', () => this.settings.setTexture('settings'))
    this.settings.on('pointerout', () => {
      this.settings.setTexture('settings');
      this.settingsText.setAlpha(0);
      this.settingsText2.setAlpha(0);
    })

    this.overSettings.on('pointerdown', async () => {
      this.noStart = true;
      this.overSettings.setTexture('settings-press');
      this.overSettings.disableInteractive();
      this.selectScreen.setAlpha(1);
    })
    this.overSettings.on('pointerover', () => {
      this.overSettingsText.setAlpha(1);
      this.overSettingsText2.setAlpha(1);
    })
    this.overSettings.on('pointerup', () => this.overSettings.setTexture('settings'))
    this.overSettings.on('pointerout', () => {
      this.overSettings.setTexture('settings');
      this.overSettingsText.setAlpha(0);
      this.overSettingsText2.setAlpha(0);
    })

    const alpaNo = ['01', '02', '03', '04'];

    alpaNo.map(n => {
      this[`alpaca${n}`].on('pointerdown', async () => {
        this.spriteNumber = n;
  
        this.alpaca.setTexture(`alpaca-${this.spriteNumber}-idle`, 0);
        await this.anims.remove('alpaca-run')
        await this.anims.create({
          key: 'alpaca-run',
          frames: this.anims.generateFrameNumbers(`alpaca-${this.spriteNumber}`, {start: 0, end: 1}),
          frameRate: 5,
          repeat: -1
        })
        this.noStart = false;
        this.settings.setInteractive();
        this.overSettings.setInteractive();
        this.selectScreen.setAlpha(0);
      })

      this[`alpaca${n}`].on('pointerover', () => this[`alpaca${n}`].setAlpha(1))

      this[`alpaca${n}`].on('pointerout', () => this[`alpaca${n}`].setAlpha(0.7))
    })
  }

  placeObstacle() {
    const obstacleNum = Math.floor(Math.random() * 7) + 1;
    const distance = Phaser.Math.Between(600, 900);

    let obstacle;
    if (obstacleNum > 6) {
      const enemyHeight = [20, 50];
      obstacle = this.obstacles.create(this.game.config.width + distance, this.game.config.height - enemyHeight[Math.floor(Math.random() * 2)] - 100, `enemy-bird`)
        .setOrigin(0, 1)
        obstacle.play('enemy-dino-fly', 1);
      obstacle.body.height = obstacle.body.height / 1.5;
    } else if (obstacleNum === 6) {
      obstacle = this.obstacles.create(this.game.config.width + distance, this.game.config.height - 100, `enemy-bear`)
        .setOrigin(0, 1)
        obstacle.play('enemy-bear-move', 1);

        obstacle.body.offset.y = +10;
    }  else if (obstacleNum === 5) {
      obstacle = this.obstacles.create(this.game.config.width + distance, this.game.config.height - 100, `enemy-witch`)
        .setOrigin(0, 1)
        obstacle.play('enemy-witch-move', 1);

        obstacle.body.offset.y = +10;
    } else {
      obstacle = this.obstacles.create(this.game.config.width + distance, this.game.config.height - 100, `obstacle-${obstacleNum}`)
        .setOrigin(0, 1);

     obstacle.body.offset.y = +10;
    }

    obstacle.setImmovable();
  }

  update(time, delta) {
    if (!this.isGameRunning) { return; }

    this.ground.tilePositionX += this.gameSpeed;
    Phaser.Actions.IncX(this.obstacles.getChildren(), -this.gameSpeed);
    Phaser.Actions.IncX(this.environment.getChildren(), - 0.5);

    this.respawnTime += delta * this.gameSpeed * 0.08;
    if (this.respawnTime >= 1500) {
      this.placeObstacle();
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
