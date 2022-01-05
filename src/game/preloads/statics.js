function StaticLoads(load) {

  const statics = [ 'ground',  'background', 'restart', 
    'settings', 'settings-press',  'close', 'close-press', 
    'start', 'game-over', 'twitter'
  ]
  
  statics.map(item => load.image(item, `assets/static/${item}.png`));

  load.spritesheet('blue', 'assets/fireworks/blue.png', {
    frameWidth: 80,
    frameHeight: 93
  })

  load.spritesheet('green', 'assets/fireworks/green.png', {
    frameWidth: 83,
    frameHeight: 86
  })

  load.spritesheet('orange', 'assets/fireworks/orange.png', {
    frameWidth: 92,
    frameHeight: 94
  })
}

export default StaticLoads;
