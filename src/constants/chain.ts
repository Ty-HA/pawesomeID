import Chain from '@/models/chain'

export const sepoliaChain: Chain = {
    id: '11155111',
    token: 'ETH',
    shortName: 'sep',
    label: 'Sepolia',
    rpcUrl: 'https://eth-sepolia.g.alchemy.com/v2/demo',
    blockExplorerUrl: 'https://sepolia.etherscan.io',
    color: '#3e6957',
    isStripePaymentsEnabled: false,
    isMoneriumPaymentsEnabled: false,
  }
  
  export const arbitrumSepoliaChain: Chain = {
    id: '421614',
    token: 'ETH',
    shortName: 'arbsep',
    label: 'Arbitrum Sepolia',
    rpcUrl: 'https://rpc.ankr.com/arbitrum_sepolia',
    blockExplorerUrl: 'https://sepolia-explorer.arbitrum.io',
    color: '#fbc02d',
    isStripePaymentsEnabled: false,
    isMoneriumPaymentsEnabled: true,
  }
  
  export const gnosisChiadoTestnetChain: Chain = {
    id: '10200',
    token: 'XDAI',
    label: 'Gnosis Chiado Testnet',
    shortName: 'gnochi',
    rpcUrl: 'https://rpc.chiadochain.net',
    blockExplorerUrl: 'https://blockscout.chiadochain.net',
    color: '#DDDDDD',
    isStripePaymentsEnabled: false,
    isMoneriumPaymentsEnabled: false,
  }
  
  export const morphTestnetChain: Chain = {
    id: '2710',
    token: 'ETH',
    shortName: 'morph',
    label: 'Morph Testnet',
    rpcUrl: 'https://rpc-testnet.morphl2.io',
    blockExplorerUrl: 'https://explorer-testnet.morphl2.io',
    color: '#8248E5',
    isStripePaymentsEnabled: false,
    isMoneriumPaymentsEnabled: false,
  }
  
  const chains: Chain[] = [
    sepoliaChain,
    arbitrumSepoliaChain,
    gnosisChiadoTestnetChain,
    morphTestnetChain,
  ]
  
  export const initialChain = sepoliaChain
  
  export default chains