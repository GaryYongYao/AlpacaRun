import React, { useEffect } from "react";
import { useEthers } from "@usedapp/core";
import Cookies from 'js-cookie';

import { request } from '../utils';
import { OPENSEA_API, OPENSEA_PARAMS, ALPACA_CONTRACT_ADD } from '../utils/common';

import '../style/style.css';

const Component = () => {
  const {activateBrowserWallet, account } = useEthers();

  const handleConnectWallet = () => {
    const { ethereum } = window || {}
    if (ethereum && ethereum.isMetaMask) {
      activateBrowserWallet();
    } else window.open('https://metamask.app.link/dapp/run.alpacadabraz.io/')
  }

  const getAlpaca = async () => {
    const assets = await request(`${OPENSEA_API}${OPENSEA_PARAMS}&asset_contract_address=${ALPACA_CONTRACT_ADD}&owner=${account}`);

    const alpacaList = assets.map(({ token_id, image_url }) => ({ token_id, image_url }))
    if (Cookies.get('alpacas') !== JSON.stringify(alpacaList)) {
      Cookies.set('multiplier', alpacaList.length);
      Cookies.set('alpacas', JSON.stringify(alpacaList));
      location.reload();
    }
  }

  useEffect(() => {
    if (account) getAlpaca()
  }, [account])

  return (
    <>
      <div id="title-bar">
        <span id="title">ALPACA RUNNNNN</span>
        {account ? (
          <span id="account">{account &&
            `${account.slice(0, 6)}...${account.slice(
              account.length - 4,
              account.length
            )}`}</span>
        ) : (
          <span onClick={handleConnectWallet} id="loginBTN">Connect Metamask</span>
        )}
      </div>
    </>
  )
}

export default Component