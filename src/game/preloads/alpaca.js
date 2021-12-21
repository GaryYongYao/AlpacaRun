import { getAlpacaIDs } from '../../utils';

function AlpacaLoads(load) {
  const owned = getAlpacaIDs();
  
  owned.map(({ image_url, token_id }) => {
    load.image(`alpaca_${token_id}`, `${image_url}=w92`)
    load.image(`alpaca-${token_id}`, `${image_url}=w92`);
    load.image(`alpaca-${token_id}-idle`, `${image_url}=w92`);
    load.image(`alpaca-${token_id}-hurt`, `assets/tombstones.png`);
  });

  const alpaca = [
    { id: '01', w: 68 },
    { id: '02', w: 74  },
    { id: '03', w: 68  },
    { id: '04', w: 65  }
  ]

  alpaca.map(({ id, w }) => {
    load.image(`alpaca-${id}-idle`, `assets/alpaca-${id}-idle.png`);
    load.image(`alpaca-${id}-hurt`, `assets/alpaca-${id}-hurt.png`);
    load.image(`alpaca-${id}`, `assets/alpaca-${id}-idle.png`);

    /* load.spritesheet(`alpaca-${id}`, `assets/alpaca-${id}-run.png`, {
      frameWidth: w,
      frameHeight: 92
    }) */
  })
}

export default AlpacaLoads;