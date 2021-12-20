import Phaser from 'phaser'
import AlpacaLoads from './game/preloads/alpaca'
import AudioLoads from './game/preloads/audio'
import ObstacleLoad from './game/preloads/obstacles'
import StaticLoads from './game/preloads/statics'

class PreloadScene extends Phaser.Scene {

  constructor() {
    super('PreloadScene');
  }

  preload() {
    const { load } = this;
    
    AudioLoads(load)
    StaticLoads(load)
    ObstacleLoad(load)
    AlpacaLoads(load)
  }

  create() {
    this.scene.start('PlayScene');
  }
}

export default PreloadScene;
