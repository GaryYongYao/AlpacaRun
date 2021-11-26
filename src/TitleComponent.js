import React from "react";
import { useEthers, useTokenBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";

import './style/style.css';

const Component = () => {
  const {activateBrowserWallet, account } = useEthers();
  const etherBalance = useTokenBalance('0x93dfaf57d986b9ca77df9376c50878e013d9c7c8', account);
  // etherBalance && console.log(parseFloat(formatEther(etherBalance)).toFixed(0))

  const handleConnectWallet = () => {
    activateBrowserWallet();
  }

  return (
    <>
      <div id="title-bar">
        <span id="title">ALPACA RUNNNNN</span>
        {account ? (
          <span id="account">{account}</span>
        ) : (
          <span onClick={handleConnectWallet} id="loginBTN">Connect Metamask</span>
        )}
      </div>
    </>
  )
}

export default Component