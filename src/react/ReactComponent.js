import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import Discord from '../images/discord.png';
import Opensea from '../images/opensea.png';
import Twitter from '../images/twitter.png';
import Share from '../images/share.svg';
import LeaderboardIcon from '../images/leaderboard.png';
import Arrow from '../images/arrow.png'
import { graphRequest, getURLId } from '../utils'
import { queryGetRunLeaderboards, queryGetRunById } from '../utils/common'

import '../style/style.css';

const Component = () => {
  const [total, setTotal] = useState([])
  const [high, setHigh] = useState([])
  const [mode, setMode] = useState(1)
  const [data, setData] = useState({})
  let id = getURLId();

  if (!id) {
    const shareID = new URL(Cookies.get('shareUrl'));
    const searchID = shareID.search.split('?id=')[1]
    id = searchID
  }

  const getLeaderboard = () => {
    graphRequest(queryGetRunLeaderboards)
      .then(res => {
        const { getRunLeaderboards, errors } = res.data
        if (errors) console.log(errors)
        if (getRunLeaderboards) {
          setTotal(getRunLeaderboards.totalLeader)
          setHigh(getRunLeaderboards.singleRoundLeader)
        }
      })
  }

  const getCurrentScore = () => {
    if (id) {
      graphRequest(queryGetRunById, { id })
        .then(res => {
          const { getRunById, errors } = res.data
          if (errors) console.log(errors)
          if (getRunById) setData(getRunById)
        })
    }
  }

  useEffect(() => {
    getLeaderboard()
    getCurrentScore()
  }, [])

  useEffect(() => {
    setTimeout(getLeaderboard, 10000)
    setTimeout(getCurrentScore, 10000)
  }, [total])

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
        {Cookies.get('shareUrl') && (
          <a
            id="share-link"
            href="#"
            onClick={async (e) => {
              e.preventDefault();
              const url = Cookies.get('shareUrl');

              const shareData = {
                title: 'Alpaca Runnn',
                text: 'Join me at run this Alpaca',
                url
              }
              await navigator.share(shareData)
            }}
          >
            <img className="logo" alt="Share" src={Share} />
          </a>
        )}
      </div>
      <div id="leaderboard">
        <div
          id="leaderboard-title"
          onClick={e => {
            e.stopPropagation();
            const className = 'open'
            var element = document.getElementById("leaderboard");
            element.classList.contains(className) ? element.classList.remove(className) : element.classList.add(className)
          }}
        >
          <img id="leaderboardIcon" src={LeaderboardIcon} />
          <div>
            {!id && 'Leaderboard'}
            {id && (
              <>
                <div>
                  #{data.tokenId}
                  <br />
                  Total: {data.totalScore} | Single : {data.highScore}
                </div>
              </>
            )}
          </div>
          <img id="arrow" src={Arrow} />
        </div>
        <div className="leaderboard-content">
          <div className="leaderboard-mode">
            <span
              onClick={e => {
                e.preventDefault();
                setMode(1);
              }}
              style={{
                textDecoration: mode === 1 ? 'none' : 'underline',
                cursor: mode === 1 ? 'default' : 'pointer',
                color: mode === 1 ? '#000' : '#fec062'
              }}
            >
              Total Score
            </span>
            <span> | </span>
            <span
              onClick={e => {
                e.preventDefault();
                setMode(2);
              }}
              style={{
                textDecoration: mode === 2 ? 'none' : 'underline',
                cursor: mode === 2 ? 'default' : 'pointer',
                color: mode === 2 ? '#000' : '#fec062'
              }}
            >
              Single Run
            </span>
          </div>
          {mode === 1 && (
            <>
              {total.map(({ tokenId, totalScore, image }) => (
                <div key={tokenId} className="rank">
                  <img src={image} />
                  <div>#{tokenId}</div>
                  <div className="score">{totalScore}</div>
                </div>
              ))}
            </>
          )}
          {mode === 2 && (
            <>
              {high.map(({ tokenId, highScore, image }) => (
                <div key={tokenId} className="rank">
                  <img src={image} />
                  <div>#{tokenId}</div>
                  <div className="score">{highScore}</div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Component