function StaticLoads(load) {
    const statics = [ 'ground',  'background', 'restart', 
      'settings', 'settings-press',  'close', 'close-press', 
      'start', 'game-over'
    ]
    
    statics.map(item => load.image(item, `assets/static/${item}.png`));
}

export default StaticLoads;
