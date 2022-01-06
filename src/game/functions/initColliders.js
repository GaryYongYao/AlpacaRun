import Cookies from 'js-cookie';
import { graphRequest/* , getMultiplier */ } from '../../utils';
import { encrypt } from '../../utils/crypto';
import { mutationUpdateRunScore, mutationUpdateNopacaRunScore } from '../../utils/common';

export function whoosh(runGame, text, s = true) {
  const { ethereum } = window;
  runGame.highScoreText.x = runGame.scoreText.x - runGame.scoreText.width - 20;

  const highScore = runGame.highScoreText.text.substr(runGame.highScoreText.text.length - 5);
  // const multiplier = runGame.shareId ? 1 : getMultiplier();
  // const finalScore = Math.floor(Number(runGame.scoreText.text) * multiplier)
  const finalScore = Number(runGame.scoreText.text)

  if (s) {
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
  
    if (!runGame.shareId && !ethereum.selectedAddress && runGame.disId) {
      const discord = runGame.disId
      const code = encrypt({ discord, score: finalScore });
  
      graphRequest(mutationUpdateNopacaRunScore, { code })
        .then(res => {
          const { updateNopacaRunScore } = res.data
          console.log(updateNopacaRunScore)
        })
        .catch(err =>  console.log(err))
    }
  }
  
  const newScore = Number(runGame.scoreText.text) > Number(highScore) ? runGame.scoreText.text : highScore;

  runGame.highScoreText.setText('HI ' + newScore);
  Cookies.set('highScore', newScore);
  runGame.highScoreText.setAlpha(1);

  runGame.FinalScoreText.setText(text || `Final Score: ${finalScore}`);
  runGame.FinalScoreText2.setText(text || `Final Score: ${finalScore}`);

  runGame.physics.pause();
  runGame.isGameRunning = false;
  runGame.anims.pauseAll();
  runGame.alpaca.setTexture(`alpaca-${runGame.spriteNumber}-hurt`);
  runGame.respawnTime = 0;
  runGame.gs = 18;
  runGame.gameOverScreen.setAlpha(1);
  runGame.score = 0;
  runGame.hitSound.play();
}

function initColliders(runGame) {
  runGame.physics.add.collider(runGame.ground, runGame.alpaca);
  runGame.physics.add.collider(runGame.alpaca, runGame.obstacles, () => whoosh(runGame), null, runGame);
}

export default initColliders
