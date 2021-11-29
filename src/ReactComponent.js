import React, { useEffect, useState } from "react";
import Discord from './images/discord.png';
import Opensea from './images/opensea.png';
import Twitter from './images/twitter.png';
import LeaderboardIcon from './images/leaderboard.png';
import Arrow from './images/arrow.png';
import { queryGetRunLeaderboards } from './common'
import { graphRequest } from './utils'

import './style/style.css';

const Component = () => {
  const [list, setList] = useState([])

  const getLeaderboard = () => {
    graphRequest(queryGetRunLeaderboards)
      .then(res => {
        const { getRunLeaderboards, errors } = res.data
        if (errors) console.log(errors)
        if (getRunLeaderboards) setList(getRunLeaderboards)
      })
  }

  useEffect(() => getLeaderboard(), [])
  useEffect(() => setTimeout(getLeaderboard, 30000), [list])

  return (
    <>
      <div id="social-text">
        FIND US ON
      </div>
      <div id="socials">
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
      </div>
      <div id="leaderboard">
        <div
          id="leaderboard-title"
          onClick={() => {
            const className = 'open'
            var element = document.getElementById("leaderboard");
            element.classList.contains(className) ? element.classList.remove(className) : element.classList.add(className)
          }}
        >
          <img id="leaderboardIcon" src={LeaderboardIcon} />
          <div>Leaderboard</div>
          <img id="arrow" src={Arrow} />
        </div>
        <div id="leaderboard-content">
          {list.map(({ tokenId, totalScore, image }) => (
            <div key={tokenId} className="rank">
              <img src={image} />
              <div>#{tokenId}</div>
              <div className="score">{totalScore}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Component