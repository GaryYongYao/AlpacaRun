import { Web3Provider } from '@ethersproject/providers';
import axios from 'axios';
import Cookies from 'js-cookie';
import { whoosh } from '../game/functions/initColliders'

axios.defaults.baseURL = ''

export const getLibrary = (provider) => {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
};

export const getAlpacaIDs = () => JSON.parse(Cookies.get('alpacas') || '[]');
export const getMultiplier = () => (Number(Cookies.get('multiplier') || 0) * 0.25) + 1;
export const calibration = (calibrating) => {
  if (calibrating.calibrate !== calibrating.score) whoosh(calibrating, "Don't Cheat", false);
  if (calibrating.gs.toFixed(2) != 18+(0.01 * (calibrating.calibrate))) whoosh(calibrating, "Don't Cheat", false);
}

export const getURLId = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const { id } = Object.fromEntries(urlSearchParams.entries());
  return id;
}

export const request = async (url, type = 'GET', data = null) => {
  try {
    const perms = {
      url: `${url}`,
      method: `${type}`,
      responseType: 'json'
    }

    if (type !== 'GET' && data) {
      perms.data = data
    } else if (type === 'GET' && data) {
      perms.params = data
    }

    const { data: { assets }, status } = await axios(perms)
    
    if (status === 200) return assets
  }
  catch(err) {
    console.error(err)
  }
};

export const graphRequest = async (gql = null, params) => {
  try {
    const url = process.env.PUBLIC_API
    const perms = {
      url,
      method: 'post',
      responseType: 'json',
      data: {
        query: gql,
        variables: params
      }
    }

    const { data, status } = await axios(perms)
    
    if (status === 200) return data
  }
  catch(err) {
    console.error(err)
  }
}