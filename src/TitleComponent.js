import React, { useEffect } from "react";
import { useEthers } from "@usedapp/core";
import Cookies from 'js-cookie';

import { request } from './utils';
import { OPENSEA_API, OPENSEA_PARAMS, ALPACA_CONTRACT_ADD } from './common';

import './style/style.css';

const Component = () => {
  const {activateBrowserWallet, account } = useEthers();

  const handleConnectWallet = () => {
    activateBrowserWallet();
  }

  const getAlpaca = async () => {
    const data = await request(`${OPENSEA_API}${OPENSEA_PARAMS}&asset_contract_address=${ALPACA_CONTRACT_ADD}&owner=${account}`);

    const alpacaList = data.map(({ token_id }) => token_id)
    if (Cookies.get('alpacas') !== JSON.stringify(alpacaList)) {
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