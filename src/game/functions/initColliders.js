import Cookies from 'js-cookie';
import { graphRequest } from '../../utils';
import { encrypt } from '../../utils/crypto';
import { mutationUpdateRunScore } from '../../utils/common';

function initColliders(runGame) {
  runGame.physics.add.collider(runGame.ground, runGame.alpaca);
  runGame.physics.add.collider(runGame.alpaca, runGame.obstacles, () => {
    runGame.highScoreText.x = runGame.scoreText.x - runGame.scoreText.width - 20;

    const highScore = runGame.highScoreText.text.substr(runGame.highScoreText.text.length - 5);

    if (runGame.ownedAlpaca && runGame.ownedAlpaca.length > 0) {
      const code = encrypt({ tokenId: runGame.spriteNumber, score: Number(runGame.scoreText.text) })

      graphRequest(mutationUpdateRunScore, { code })
        .then(res => {
          const { updateRunScore } = res.data
          console.log(updateRunScore)
        })
        .catch(err =>  console.log(err))
    }
    
    const newScore = Number(runGame.scoreText.text) > Number(highScore) ? runGame.scoreText.text : highScore;

    runGame.highScoreText.setText('HI ' + newScore);
    Cookies.set('highScore', newScore);
    runGame.highScoreText.setAlpha(1);

    runGame.physics.pause();
    runGame.isGameRunning = false;
    runGame.anims.pauseAll();
    runGame.alpaca.setTexture(`alpaca-${runGame.spriteNumber}-hurt`);
    runGame.respawnTime = 0;
    runGame.gameSpeed = 18;
    runGame.gameOverScreen.setAlpha(1);
    runGame.score = 0;
    runGame.hitSound.play();
  }, null, runGame);
}

export default initColliders
