import Cookies from 'js-cookie';
import { graphRequest/* , getMultiplier */ } from '../../utils';
import { encrypt } from '../../utils/crypto';
import { mutationUpdateRunScore, mutationUpdateNopacaRunScore } from '../../utils/common';

function initColliders(runGame) {
  runGame.physics.add.collider(runGame.ground, runGame.alpaca);
  runGame.physics.add.collider(runGame.alpaca, runGame.obstacles, () => {
    runGame.highScoreText.x = runGame.scoreText.x - runGame.scoreText.width - 20;

    const highScore = runGame.highScoreText.text.substr(runGame.highScoreText.text.length - 5);
    // const multiplier = runGame.shareId ? 1 : getMultiplier();
    // const finalScore = Math.floor(Number(runGame.scoreText.text) * multiplier)
    const finalScore = Number(runGame.scoreText.text)

    if (runGame.shareId || (runGame.ownedAlpaca && runGame.ownedAlpaca.length > 0)) {
      const tokenId = runGame.shareId ? runGame.shareId : runGame.spriteNumber
      const code = encrypt({ tokenId, score: finalScore });

      graphRequest(mutationUpdateRunScore, { code })
        .then(res => {
          const { updateRunScore } = res.data
          console.log(updateRunScore)
        })
        .catch(err =>  console.log(err))
    }

    /* nopaca logic
    if (runGame.shareId || (runGame.ownedAlpaca && runGame.ownedAlpaca.length > 0)) {
      const tokenId = runGame.shareId ? runGame.shareId : runGame.spriteNumber
      const code = encrypt({ tokenId, score: finalScore });

      graphRequest(mutationUpdateRunScore, { code })
        .then(res => {
          const { updateRunScore } = res.data
          console.log(updateRunScore)
        })
        .catch(err =>  console.log(err))
    } */
    
    const newScore = Number(runGame.scoreText.text) > Number(highScore) ? runGame.scoreText.text : highScore;

    runGame.highScoreText.setText('HI ' + newScore);
    Cookies.set('highScore', newScore);
    runGame.highScoreText.setAlpha(1);

    runGame.FinalScoreText.setText(`Final Score: ${finalScore}`);
    runGame.FinalScoreText2.setText(`Final Score: ${finalScore}`);

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
