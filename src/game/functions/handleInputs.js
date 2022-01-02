import { map } from 'lodash';
import Cookies from 'js-cookie';

function handleInputs(runGame) {
  const { height } = runGame.game.config;

  function tweetscore(){
    //share score on twitter
    var tweetbegin = `https://twitter.com/intent/tweet?text=`;
    var tweettxt = `I scored ${Number(runGame.scoreText.text)} at Alpaca RUNNN. \n ${window.location.href} \n #AlpacaRun #NFT @Alpacadabraz`;
    var finaltweet = tweetbegin + encodeURIComponent(tweettxt);
    window.open(finaltweet,'_blank');
  }

  runGame.restart.on('pointerdown', () => {
    runGame.alpaca.setVelocityY(0);
    runGame.alpaca.body.height = 92;
    runGame.alpaca.body.offset.y = 0;
    runGame.alpaca.setY(height - 120);
    runGame.physics.resume();
    runGame.obstacles.clear(true, true);
    runGame.isGameRunning = true;
    runGame.gameOverScreen.setAlpha(0);
    runGame.anims.resumeAll();
  })

  const jump = () => {
    if (!runGame.alpaca.body.onFloor() || runGame.alpaca.body.velocity.x > 0 || runGame.noStart ) return; 

    if (runGame.gameOverScreen.alpha !== 1) {
      runGame.jumpSound.play();
      runGame.alpaca.body.height = 92;
      runGame.alpaca.body.offset.y = 0;
      runGame.alpaca.setVelocityY(-1600);
      runGame.alpaca.setTexture(`alpaca-${runGame.spriteNumber}`, 0);
    }
  }

  runGame.input.keyboard.on('keydown-SPACE', jump)
  runGame.alpaca.on('pointerdown', jump)
  runGame.ground.on('pointerdown', jump)
  runGame.goodWeather.on('pointerdown', jump)

  runGame.settings.on('pointerdown', async () => {
    runGame.noStart = true;
    runGame.settings.setTexture('settings-press');
    runGame.settings.disableInteractive();
    runGame.selectScreen.setAlpha(1);
  })
  runGame.settings.on('pointerup', () => runGame.settings.setTexture('settings'))
  runGame.settings.on('pointerout', () => {
    runGame.settings.setTexture('settings');
  })

  runGame.overSettings.on('pointerdown', async () => {
    runGame.noStart = true;
    runGame.overSettings.setTexture('settings-press');
    runGame.overSettings.disableInteractive();
    runGame.selectScreen.setAlpha(1);
  })
  runGame.overSettings.on('pointerup', () => runGame.overSettings.setTexture('settings'))
  runGame.overSettings.on('pointerout', () => {
    runGame.overSettings.setTexture('settings');
  })

  if (runGame.ownedAlpaca.length < 1) {
    const alpaNo = ['01', '02', '03', '04'];
  
    map(alpaNo, n => {
      runGame[`alpaca${n}`].on('pointerdown', async () => {
        runGame.spriteNumber = n;
        console.log(`alpaca-${runGame.spriteNumber}-idle`)
  
        runGame.alpaca.setTexture(`alpaca-${runGame.spriteNumber}-idle`, 0);
        /* await runGame.anims.remove('alpaca-run')
        await runGame.anims.create({
          key: 'alpaca-run',
          frames: runGame.anims.generateFrameNumbers(`alpaca-${runGame.spriteNumber}`, {start: 0, end: 1}),
          frameRate: 5,
          repeat: -1
        }) */
        runGame.noStart = false;
        runGame.settings.setInteractive();
        runGame.overSettings.setInteractive();
        runGame.selectScreen.setAlpha(0);
      })
  
      runGame[`alpaca${n}`].on('pointerover', () => runGame[`alpaca${n}`].setAlpha(1))
  
      runGame[`alpaca${n}`].on('pointerout', () => runGame[`alpaca${n}`].setAlpha(0.7))
    })
  } else {
    map(runGame.ownedAlpaca, ({ token_id }) => {
      runGame[`alpaca${token_id}`].on('pointerdown', async () => {
        runGame.spriteNumber = token_id;
  
        runGame.alpaca.setTexture(`alpaca-${runGame.spriteNumber}-idle`, 0);
        runGame.noStart = false;
        runGame.settings.setInteractive();
        runGame.overSettings.setInteractive();
        runGame.selectScreen.setAlpha(0);

        let url = new URL(window.location);
        url.searchParams.set('id', token_id);
        Cookies.set('shareUrl', url.href);
      })
  
      runGame[`alpaca${token_id}`].on('pointerover', () => runGame[`alpaca${token_id}`].setAlpha(1))
      runGame[`alpaca${token_id}`].on('pointerout', () => runGame[`alpaca${token_id}`].setAlpha(0.7))
    })
  }

  runGame.twitter.on('pointerdown', async () => tweetscore());

}

export default handleInputs;
