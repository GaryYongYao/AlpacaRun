import { chunk, map } from 'lodash';

function SelectScreen(runGame) {
  const { height, width } = runGame.game.config;
  
  runGame.selectScreen = runGame.add.container(width / 2, 0).setDepth(100).setAlpha(0)
  runGame.selectBackground = runGame.add.image(0, 0, 'background').setOrigin(0.5, 0)
  runGame.selectText = runGame.add.text(0, 50, "SELECT YOUR ALPACA", { fill: "#fec062", fontSize: 35, fontFamily: 'nokiafc22' })
    .setOrigin(0.5, 0);

  const selection = [runGame.selectBackground, runGame.selectText]

  
  const zone = runGame.add.zone(0, 0, 1200, 880).setInteractive();
  selection.push(zone)
  
  if (runGame.ownedAlpaca.length < 1) {
    const alpaNo = ['01', '02', '03', '04'];

    map(alpaNo, (n, i) => {
      runGame[`alpaca${n}`] = runGame.add.image(-300 + (200 * i), height - 100, `alpaca-${n}-idle`)
        .setFlipX(true)
        .setAlpha(0.7)
        .setInteractive();

      selection.push(runGame[`alpaca${n}`])
    })
  } else {
    const chkArr = chunk(runGame.ownedAlpaca, 5);
    map(chkArr, (arr, row) => {
      map(arr, ({ token_id }, col) => {
        runGame[`alpaca${token_id}`] = runGame.add.image(-400 + (200 * col), 150 + (150 * row), `alpaca_${token_id}`)
          .setFlipX(true)
          .setAlpha(0.7)
          .setInteractive();
  
        selection.push(runGame[`alpaca${token_id}`])
      })
    })
    
    zone.on('wheel', function (pointer) {
      map(chkArr, (arr, row) => {
        map(arr, ({ token_id }) => {
          runGame[`alpaca${token_id}`].y = runGame[`alpaca${token_id}`].y - pointer.deltaY;
      
          runGame[`alpaca${token_id}`].y = Phaser.Math.Clamp(runGame[`alpaca${token_id}`].y, (150 + (150 * row)) - (150 * (chkArr.length - 1)), 150 + (150 * row));
        })
      })
    })
  }

  runGame.selectScreen.add(selection)
}

export default SelectScreen;
