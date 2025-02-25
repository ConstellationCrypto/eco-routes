import { Signer } from 'ethers';
import { Deployer, Prover } from '../typechain-types';
import { Hex } from 'viem';
export declare const ALCHEMY_API_KEY: string;
export type DeployNetwork = {
    gasLimit: number;
    intentSource: {
        counter: number;
    };
    hyperlaneMailboxAddress: Hex;
    metalayerRouterAddress: Hex;
    network: string;
    pre: boolean;
    chainId: number;
    chainConfiguration: {
        provingMechanism: number;
        settlementChainId: number;
        settlementContract: Hex;
        blockhashOracle: Hex;
        outputRootVersionNumber: number;
        finalityDelaySeconds: number;
    };
    [key: string]: any;
};
export type DeployNetworkConfig = Pick<DeployNetwork, 'chainId' | 'chainConfiguration'>;
export type DeployDisputeNetworkConfig = Omit<DeployNetwork, 'pre' | 'intentSource' | 'hyperlaneMailboxAddress' | 'gasLimit'>;
export type ProtocolDeploy = {
    proverAddress: Hex;
    intentSourceAddress: Hex;
    inboxAddress: Hex;
    hyperProverAddress: Hex;
    metalayerProverAddress: Hex;
    initialSalt: string;
};
export declare function getEmptyProtocolDeploy(): ProtocolDeploy;
export type DeployProtocolOptions = {
    isSolvingPublic: boolean;
    deployPre?: boolean;
};
export declare function deployProtocol(protocolDeploy: ProtocolDeploy, deployNetwork: DeployNetwork, solver: Hex, proverConfig: any, options?: DeployProtocolOptions): Promise<void>;
export declare function deployProver(deploySalt: string, deployNetwork: DeployNetwork, singletonDeployer: Deployer, deployArgs: Prover.ChainConfigurationConstructorStruct[]): Promise<`0x${string}` | undefined>;
export declare function deployIntentSource(deployNetwork: DeployNetwork, deploySalt: string, singletonDeployer: Deployer): Promise<`0x${string}`>;
export declare function deployInbox(deployNetwork: DeployNetwork, inboxOwnerSigner: Signer, isSolvingPublic: boolean, solvers: Hex[], deploySalt: string, singletonDeployer: Deployer): Promise<`0x${string}`>;
export declare function deployHyperProver(deployNetwork: DeployNetwork, inboxAddress: Hex, deploySalt: string, singletonDeployer: Deployer): Promise<`0x${string}`>;
export declare function deployMetalayerProver(deployNetwork: DeployNetwork, inboxAddress: Hex, deploySalt: string, singletonDeployer: Deployer): Promise<`0x${string}`>;
