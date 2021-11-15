import React from "react";
import Discord from './images/discord.png';
import Opensea from './images/opensea.png';
import Twitter from './images/twitter.png';

import './style/style.css';

const Component = () => {
  return (
    <>
      <a
        id="opensea-link"
        href="https://opensea.io/collection/alpacadabraz"
        target="_blank"
      >
        <img className="logo" alt="OPENSEA" src={Opensea} />
      </a>
      <a
        id="discord-link"
        href="http://discord.gg/alpacadabraz"
        target="_blank"
      >
        <img className="logo" alt="DISCORD" src={Discord} />
      </a>
      <a
        id="twitter-link"
        href="https://twitter.com/alpacadabraz"
        target="_blank"
      >
        <img className="logo" alt="TWITTER" src={Twitter} />
      </a>
    </>
  )
}

export default Component