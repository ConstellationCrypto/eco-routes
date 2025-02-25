import { Hex } from 'viem';
export type ContractDeployConfigs = {
    name: string;
    path: string;
    abi: any;
    bytecode: Hex;
    args: any[];
};
export type ContractNames = 'IntentSource' | 'Inbox' | 'HyperProver';
declare const MainnetContracts: Record<ContractNames, ContractDeployConfigs>;
export default MainnetContracts;
