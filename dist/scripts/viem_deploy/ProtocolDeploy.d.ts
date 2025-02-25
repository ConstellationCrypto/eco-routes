import { Hex, Chain, PrivateKeyAccount, RpcSchema, Transport } from 'viem';
import { ContractDeployConfigs } from './contracts/mainnet';
import { DeployWalletClient } from './utils';
import { SaltsType } from '../deploy/addresses';
/**
 * Deploy types options.
 */
export type DeployOpts = {
    pre?: boolean;
    retry?: boolean;
    deployType?: 'create2' | 'create3';
};
type DeployWallletType = DeployWalletClient<Transport, Chain, PrivateKeyAccount, RpcSchema>;
/**
 * Deploys the eco protocol to all the chains passed with the salts provided.
 * After deploy it verify the contracts on etherscan.
 */
export declare class ProtocolDeploy {
    private queueVerify;
    private queueDeploy;
    private deployChains;
    private salts?;
    private clients;
    private account;
    /**
     * Constructor that initializes the account and clients for the chains.
     * @param deployChains the chains to deploy the contracts to, defaults to {@link DeployChains}
     * @param salts
     */
    constructor(deployChains?: Chain[], salts?: SaltsType);
    /**
     * Deploy the full network to all the chains passed in the constructor.
     * @param concurrent if the chain deploys should be done concurrently or not
     */
    deployFullNetwork(concurrent?: boolean): Promise<void>;
    /**
     * Deploys the network to a chain with a given salt.
     *
     * @param chain the chain to deploy on
     * @param salt the origin salt to use
     * @param opts deploy options
     */
    deployViemContracts(chain: Chain, salt: Hex, opts?: DeployOpts): Promise<void>;
    /**
     * Deploys the prover contract.
     *
     * @param chain the chain to deploy on
     * @param salt the origin salt to use
     * @param opts deploy options
     */
    /**
     * Deploys the intent source contract.
     *
     * @param chain the chain to deploy on
     * @param salt the origin salt to use
     * @param opts deploy options
     */
    deployIntentSource(chain: Chain, salt: Hex, opts?: DeployOpts): Promise<void>;
    /**
     * Deploys the inbox contract, and optionally the hyper prover contract.
     *
     * @param chain the chain to deploy on
     * @param salt the origin salt to use
     * @param deployHyper if the hyper prover should be deployed
     * @param opts deploy options
     */
    deployInbox(chain: Chain, salt: Hex, deployHyper: boolean, opts?: DeployOpts): Promise<void>;
    /**
     * Deploys the hyper prover contract.
     *
     * @param chain the chain to deploy on
     * @param salt the origin salt to use
     * @param inboxAddress the inbox address
     * @param opts deploy options
     */
    deployHyperProver(chain: Chain, salt: Hex, inboxAddress: Hex, opts?: DeployOpts): Promise<void>;
    /**
     * Deploys a contract and verifies it on etherscan.
     *
     * @param chain the chain to deploy on
     * @param salt the origin salt to use
     * @param parameters the contract parameters, abi, constructor args etc
     * @param opts deploy options
     */
    deployAndVerifyContract(chain: Chain, salt: Hex, parameters: ContractDeployConfigs, opts?: DeployOpts): Promise<Hex>;
    getDeployedAddress(client: DeployWallletType, deployerContract: any, encodedDeployData: Hex, salt: Hex): Promise<`0x${string}` | null>;
    /**
     * Transforms a given salt with a contract name and then keccaks it.
     * Generates a deterministic salt per contract.
     *
     * @param salt the origin salt
     * @param contractName the name of the contract
     * @returns
     */
    transformSalt(salt: Hex, contractName: string): Hex;
    /**
     * Gets the deployer contract based on the deploy opts.
     *
     * @param opts the deploy opts
     * @returns
     */
    getDepoyerContract(opts: DeployOpts): {
        constractName: string;
        address: `0x${string}`;
        abi: ({
            inputs: never[];
            name: string;
            type: string;
            anonymous?: undefined;
            outputs?: undefined;
            stateMutability?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            outputs?: undefined;
            stateMutability?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string; /**
                 * Deploys the eco protocol to all the chains passed with the salts provided.
                 * After deploy it verify the contracts on etherscan.
                 */
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
    };
}
export {};
