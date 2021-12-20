function AudioLoads(load) {
  const audio = ['jump', 'hit', 'reach']
  
  audio.map(item => load.audio(item, `assets/audio/${item}.m4a`));
}

export default AudioLoads;
