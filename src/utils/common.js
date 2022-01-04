export const OPENSEA_API = 'https://api.opensea.io/api/v1/';
export const OPENSEA_PARAMS = 'assets?order_direction=desc&offset=0&limit=20';

export const ALPACA_CONTRACT_ADD = '0x3db5463a9e2d04334192c6f2dd4b72def4751a61';


// graphql
export const queryGetRunLeaderboards = `
  query {
    getRunLeaderboards {
      totalLeader {
        tokenId
        totalScore
        image
      }
      singleRoundLeader {
        tokenId
        highScore
        image
      }
    }
  }
`

export const queryGetNopacaRunLeaderboards = `
  query {
    getNopacaRunLeaderboards {
      totalLeader {
        discord
        totalScore
      }
      singleRoundLeader {
        discord
        highScore
      }
    }
  }
`

export const queryGetRunById = `
query getRunById($id: String!){
  getRunById(id: $id) {
    tokenId
    totalScore
    highScore
    image
  }
}
`

export const queryGetNopacaRunById= `
query getNopacaRunById($id: String!){
  getNopacaRunById(id: $id) {
    discord
    totalScore
    highScore
  }
}
`

export const mutationUpdateRunScore = `
  mutation updateRunScore($code: String!) {
    updateRunScore( code: $code ) 
  }
`

export const mutationUpdateNopacaRunScore = `
  mutation updateNopacaRunScore($code: String!) {
    updateNopacaRunScore( code: $code ) 
  }
`
