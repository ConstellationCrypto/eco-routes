import {
  arbitrumChainConfiguration,
  baseChainConfiguration,
  mantleChainConfiguration,
  optimismChainConfiguration,
} from './mainnet.config'
import {
  arbitrumSepoliaChainConfiguration,
  baseSepoliaChainConfiguration,
  mantleSepoliaChainConfiguration,
  optimismSepoliaChainConfiguration,
  curtisTestnetChainConfiguration,
  mantaSepoliaChainConfiguration,
} from './sepolia.config'

export const SepoliaChainConfigs = {
  baseSepoliaChainConfiguration,
  optimismSepoliaChainConfiguration,
  // ecoTestnetChainConfiguration,
  arbitrumSepoliaChainConfiguration,
  mantleSepoliaChainConfiguration,
  curtisTestnetChainConfiguration,
  mantaSepoliaChainConfiguration
}

export const MainnetChainConfigs = {
  baseChainConfiguration,
  optimismChainConfiguration,
  // helixChainConfiguration,
  arbitrumChainConfiguration,
  mantleChainConfiguration,
  curtisTestnetChainConfiguration,
}
