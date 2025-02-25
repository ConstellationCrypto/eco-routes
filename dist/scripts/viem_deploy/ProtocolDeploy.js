"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtocolDeploy = void 0;
const viem_1 = require("viem");
const mainnet_1 = __importDefault(require("./contracts/mainnet"));
const deployer_1 = require("./contracts/deployer");
const utils_1 = require("./utils");
const addresses_1 = require("../deploy/addresses");
const chains_1 = require("./chains");
const dotenv = __importStar(require("dotenv"));
const utils_2 = require("../utils");
const verify_1 = require("./verify");
// eslint-disable-next-line node/no-missing-import
const p_queue_1 = __importDefault(require("p-queue"));
const lodash_1 = require("lodash");
const config_1 = require("./config");
dotenv.config();
// wait for 10 seconds before polling for nonce update
const NONCE_POLL_INTERVAL = 10000;
/**
 * Deploys the eco protocol to all the chains passed with the salts provided.
 * After deploy it verify the contracts on etherscan.
 */
class ProtocolDeploy {
    /**
     * Constructor that initializes the account and clients for the chains.
     * @param deployChains the chains to deploy the contracts to, defaults to {@link DeployChains}
     * @param salts
     */
    constructor(deployChains = chains_1.DeployChains, salts) {
        // The queue for verifying contracts on etherscan
        this.queueVerify = new p_queue_1.default({ interval: 1000, intervalCap: 1 }); // theres a 5/second limit on etherscan
        // The queue for deploying contracts to chains
        this.queueDeploy = new p_queue_1.default();
        // The chains to deploy the contracts to
        this.deployChains = [];
        // The clients for the chains. Initialize once use multiple times
        this.clients = {};
        this.deployChains = deployChains;
        this.account = (0, utils_1.getDeployAccount)();
        for (const chain of deployChains) {
            const val = (0, utils_1.getClient)(chain, this.account);
            this.clients[chain.id] = val;
        }
        this.salts = salts;
        (0, addresses_1.createFile)(addresses_1.jsonFilePath);
    }
    /**
     * Deploy the full network to all the chains passed in the constructor.
     * @param concurrent if the chain deploys should be done concurrently or not
     */
    async deployFullNetwork(concurrent = false) {
        const { salt, saltPre } = !(0, lodash_1.isEmpty)(this.salts)
            ? this.salts
            : { salt: (0, utils_1.getGitRandomSalt)(), saltPre: (0, utils_1.getGitRandomSalt)() };
        (0, addresses_1.saveDeploySalts)({ salt, saltPre });
        console.log('Using Salts :', salt, saltPre);
        for (const chain of this.deployChains) {
            if (concurrent) {
                this.queueDeploy.add(async () => {
                    await this.deployViemContracts(chain, salt);
                    await this.deployViemContracts(chain, saltPre, {
                        pre: true,
                        retry: true,
                    });
                });
            }
            else {
                await this.deployViemContracts(chain, salt);
                await this.deployViemContracts(chain, saltPre, {
                    pre: true,
                    retry: true,
                });
            }
        }
        if (concurrent) {
            // wait for queue to finish
            await this.queueDeploy.onIdle();
        }
        // wait for verification queue to finish
        await this.queueVerify.onIdle();
    }
    /**
     * Deploys the network to a chain with a given salt.
     *
     * @param chain the chain to deploy on
     * @param salt the origin salt to use
     * @param opts deploy options
     */
    async deployViemContracts(chain, salt, opts) {
        console.log('Deploying contracts with the account:', this.account.address);
        console.log('Deploying with base salt : ' + JSON.stringify(salt));
        try {
            // await this.deployProver(chain, salt, opts)
            await this.deployIntentSource(chain, salt, {
                deployType: 'create3',
                retry: true,
                ...opts,
            });
            await this.deployInbox(chain, salt, true, {
                deployType: 'create3',
                retry: true,
                ...opts,
            });
        }
        catch (e) {
            console.error(`Failed to deploy contracts on ${chain.name}:`, e);
            console.error('Moving onto next chain...');
        }
    }
    /**
     * Deploys the prover contract.
     *
     * @param chain the chain to deploy on
     * @param salt the origin salt to use
     * @param opts deploy options
     */
    // async deployProver(chain: Chain, salt: Hex, opts?: DeployOpts) {
    //   await this.deployAndVerifyContract(
    //     chain,
    //     salt,
    //     getConstructorArgs(chain, 'Prover'),
    //     opts,
    //   )
    // }
    /**
     * Deploys the intent source contract.
     *
     * @param chain the chain to deploy on
     * @param salt the origin salt to use
     * @param opts deploy options
     */
    async deployIntentSource(chain, salt, opts) {
        const params = {
            ...(0, utils_1.getConstructorArgs)(chain, 'IntentSource'),
            args: [],
        };
        await this.deployAndVerifyContract(chain, salt, params, opts);
    }
    /**
     * Deploys the inbox contract, and optionally the hyper prover contract.
     *
     * @param chain the chain to deploy on
     * @param salt the origin salt to use
     * @param deployHyper if the hyper prover should be deployed
     * @param opts deploy options
     */
    async deployInbox(chain, salt, deployHyper, opts = { deployType: 'create3', retry: true, pre: false }) {
        const config = config_1.ViemDeployConfig[chain.id];
        const ownerAndSolver = this.account.address;
        const params = {
            ...(0, utils_1.getConstructorArgs)(chain, 'Inbox'),
            args: [ownerAndSolver, true, [ownerAndSolver]],
        };
        const inboxAddress = await this.deployAndVerifyContract(chain, salt, params, opts);
        try {
            const client = this.clients[chain.id];
            const { request } = await client.simulateContract({
                address: inboxAddress,
                abi: mainnet_1.default.Inbox.abi,
                functionName: 'setMailbox',
                args: [config.hyperlaneMailboxAddress],
            });
            await (0, utils_2.waitForNonceUpdate)(client, this.account.address, NONCE_POLL_INTERVAL, async () => {
                const hash = await client.writeContract(request);
                await client.waitForTransactionReceipt({ hash });
            });
            console.log(`Chain: ${chain.name}, Inbox ${inboxAddress} setMailbox to: ${config.hyperlaneMailboxAddress}`);
        }
        catch (error) {
            console.error(`Chain: ${chain.name}, Failed to set hyperlane mailbox address ${config.hyperlaneMailboxAddress} on inbox contract ${inboxAddress}:`, error);
            if (opts.retry) {
                opts.retry = false;
                console.log(`Retrying setting hyperlane mailbox address on inbox contract ${inboxAddress}...`);
                // wait for 15 seconds before retrying
                await new Promise((resolve) => setTimeout(resolve, 15000));
                await this.deployInbox(chain, salt, deployHyper, opts);
            }
            return;
        }
        if (deployHyper) {
            await this.deployHyperProver(chain, salt, inboxAddress, opts);
        }
    }
    /**
     * Deploys the hyper prover contract.
     *
     * @param chain the chain to deploy on
     * @param salt the origin salt to use
     * @param inboxAddress the inbox address
     * @param opts deploy options
     */
    async deployHyperProver(chain, salt, inboxAddress, opts) {
        const config = config_1.ViemDeployConfig[chain.id];
        const params = {
            ...(0, utils_1.getConstructorArgs)(chain, 'HyperProver'),
            args: [config.hyperlaneMailboxAddress, inboxAddress],
        };
        opts = { ...opts, deployType: 'create3' };
        await this.deployAndVerifyContract(chain, salt, params, opts);
    }
    /**
     * Deploys a contract and verifies it on etherscan.
     *
     * @param chain the chain to deploy on
     * @param salt the origin salt to use
     * @param parameters the contract parameters, abi, constructor args etc
     * @param opts deploy options
     */
    async deployAndVerifyContract(chain, salt, parameters, opts = { deployType: 'create3', retry: true, pre: false }) {
        if (!(0, utils_2.storageProverSupported)(chain.id, parameters.name)) {
            console.log(`Unsupported network ${chain.name} detected, skipping storage Prover deployment`);
            return viem_1.zeroAddress;
        }
        // if create3, transform the salt
        if (opts.deployType === 'create3') {
            salt = this.transformSalt(salt, parameters.name);
        }
        const { name } = parameters;
        const client = this.clients[chain.id];
        console.log(`Deploying ${name}...`);
        try {
            const encodedDeployData = (0, viem_1.encodeDeployData)(parameters);
            let args = {};
            if (parameters.args) {
                const description = parameters.abi.find((x) => 'type' in x && x.type === 'constructor');
                args = (0, viem_1.encodeAbiParameters)(description.inputs, parameters.args).slice(2); // chop the 0x off
            }
            console.log('salt is', salt);
            const deployerContract = this.getDepoyerContract(opts);
            const hasDeployedAddress = await this.getDeployedAddress(client, deployerContract, encodedDeployData, salt);
            let deployedAddress;
            if (!hasDeployedAddress) {
                const { request, result } = await client.simulateContract({
                    address: deployerContract.address,
                    abi: deployerContract.abi,
                    functionName: 'deploy',
                    args: [encodedDeployData, salt],
                });
                await (0, utils_2.waitForNonceUpdate)(client, this.account.address, NONCE_POLL_INTERVAL, async () => {
                    const hash = await client.writeContract(request);
                    // wait so that the nonces dont collide
                    await client.waitForTransactionReceipt({ hash });
                });
                deployedAddress = result;
            }
            else {
                console.log(`Contract has already been deployed to chain ${chain.name} at address ${hasDeployedAddress}. Skipping deploy`);
                deployedAddress = hasDeployedAddress;
            }
            console.log(`Chain: ${chain.name}, ${name} deployed at: ${deployedAddress}`);
            const jsonConfig = {
                chainId: chain.id,
                pre: opts.pre || false,
            };
            (0, addresses_1.addJsonAddress)(jsonConfig, `${name}`, deployedAddress);
            console.log(`Chain: ${chain.name}, ${name} address updated in addresses.json`);
            // Verify the contract on Etherscan
            if (!hasDeployedAddress) {
                console.log(`Verifying ${name} on Etherscan...`);
                this.queueVerify.add(async () => (0, verify_1.verifyContract)({
                    chainId: chain.id,
                    codeformat: 'solidity-standard-json-input',
                    constructorArguements: args,
                    contractname: name,
                    contractaddress: deployedAddress,
                    contractFilePath: `${parameters.path}/${name}.sol`,
                }));
            }
            else {
                console.log(`Skipping verification of ${name} on Etherscan since contract was previously deployed...`);
            }
            return deployedAddress;
        }
        catch (error) {
            console.error(`Chain: ${chain.name}, Failed to deploy or verify ${name}:`, error);
            if (opts.retry) {
                opts.retry = false;
                console.log(`Retrying ${name} deployment...`);
                // wait for 15 seconds before retrying
                await (0, utils_2.waitMs)(15000);
                return await this.deployAndVerifyContract(chain, salt, parameters, opts);
            }
            else {
                throw new Error(`Contract address is null, might not have deployed. Chain: ${chain.name}, Failed to deploy or verify ${name}: ${error}`);
            }
        }
    }
    async getDeployedAddress(client, deployerContract, encodedDeployData, salt) {
        const { result: deployedAddress } = await client.simulateContract({
            address: deployerContract.address,
            abi: deployerContract.abi,
            functionName: 'deployedAddress',
            args: [encodedDeployData, this.account.address, salt],
        });
        const bytecode = await client.getCode({
            address: deployedAddress,
        });
        // If bytecode is empty, there's no contract deployed
        const contractDeployed = !!bytecode && bytecode !== '0x';
        return contractDeployed ? deployedAddress : null;
    }
    /**
     * Transforms a given salt with a contract name and then keccaks it.
     * Generates a deterministic salt per contract.
     *
     * @param salt the origin salt
     * @param contractName the name of the contract
     * @returns
     */
    transformSalt(salt, contractName) {
        const transformedSalt = (0, viem_1.keccak256)((0, viem_1.toBytes)(salt + contractName));
        console.log(`Transformed salt ${salt} for ${contractName}: ${transformedSalt}`);
        return transformedSalt;
    }
    /**
     * Gets the deployer contract based on the deploy opts.
     *
     * @param opts the deploy opts
     * @returns
     */
    getDepoyerContract(opts) {
        switch (opts.deployType) {
            case 'create3':
                return deployer_1.Create3Deployer;
            case 'create2':
            default:
                return deployer_1.Create2Deployer;
        }
    }
}
exports.ProtocolDeploy = ProtocolDeploy;
