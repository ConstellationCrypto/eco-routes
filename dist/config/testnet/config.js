"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cannon = exports.bedrock = exports.networks = exports.actors = exports.intent = exports.networkIds = exports.provingMechanisms = void 0;
const viem_1 = require("viem");
/* eslint-disable no-magic-numbers */
const provingMechanisms = {
    self: 0,
    bedrock: 1,
    cannon: 2,
    nitro: 3,
    hyperProver: 4,
    0: 'self',
    1: 'bedrock',
    2: 'cannon',
    3: 'nitro',
    4: 'hyperProver',
};
exports.provingMechanisms = provingMechanisms;
const networkIds = {
    sepolia: 11155111,
    optimismSepolia: 11155420,
    baseSepolia: 84532,
    ecoTestnet: 471923,
    arbitrumSepolia: 421614,
    mantleSepolia: 5003,
    polygonSepolia: 80002,
    curtisTestnet: 33111,
    mantaSepolia: 3441006,
    11155111: 'sepolia',
    11155420: 'optimismSepolia',
    84532: 'baseSepolia',
    471923: 'ecoTestnet',
    421614: 'arbitrumSepolia',
    5003: 'mantleSepolia',
    33111: 'curtisTestnet',
    3441006: 'mantaSepolia',
};
exports.networkIds = networkIds;
// const enshrined: any = {
//   bedrock: {
//     noncePacking: 1,
//     outputSlotNumber: 3,
//     outputRootVersionNumber: 0,
//     chainData: {
//       base: {
//         l1OutputOracleAddress: '0x84457ca9D0163FbC4bbfe4Dfbb20ba46e48DF254',
//       },
//     },
//   },
//   cannon: {
//     noncePacking: 1,
//     rootClaimVersionNo: '0',
//     gameType: 0,
//     disputeGameFactoryListSlotNumber: 104,
//     faultDisputeGameClaimSlot:
//       '0x405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ad1',
//     faultDisputeGameStatusSlot: 0,
//     chainData: {
//       optimism: {
//         disputeGameFactoryAddress: '0x05F9613aDB30026FFd634f38e5C4dFd30a197Fa1',
//       },
//     },
//   },
// }
const actors = {
    deployer: '0x6cae25455BF5fCF19cE737Ad50Ee3BC481fCDdD4',
    intentCreator: '0x448729e46C442B55C43218c6DB91c4633D36dFC0',
    solver: '0x7b65Dd8dad147C5DBa896A7c062a477a11a5Ed5E',
    claimant: '0xB4e2a27ed497E2D1aD0C8fB3a47803c934457C58',
    prover: '0x923d4fDfD0Fb231FDA7A71545953Acca41123652',
    recipient: '0xC0Bc9bA69aCD4806c4c48dD6FdFC1677212503e9',
};
exports.actors = actors;
// Note intents currently being used are for USDC with a common set of actors
// the other data coming from the network
// Here we store a minimal set of addtional fieds
const intent = {
    rewardAmounts: [1001],
    targetAmounts: [1000],
    duration: 3600,
};
exports.intent = intent;
const networks = {
    // sepolia: {
    //   network: 'sepolia',
    //   chainId: networkIds.sepolia,
    //   // The following settlement contracts are useful for event listening
    //   settlementContracts: {
    //     optimismSepolia: '0x05F9613aDB30026FFd634f38e5C4dFd30a197Fa1', // optimismSepolia Dispute Game Factory
    //     baseSepolia: '0xd6E6dBf4F7EA0ac412fD8b65ED297e64BB7a06E1', // baseSepolia Dispute Game Factory
    //     // arbitrumSepolia: '0xd80810638dbDF9081b72C1B33c65375e807281C8', // arbitrumSepolia Rollup Admin Contract
    //   },
    // },
    optimismSepolia: {
        network: 'optimism-sepolia',
        chainId: networkIds.optimismSepolia,
        proverContractAddress: '0xAdc0BBf74BB9b3A41f5b89cE8bC70f45D8CAA7f4',
        hyperProverContractAddress: '0x1fCF488B9375f3530e22D14f4D1866483F81b599',
        intentSourceAddress: '0xD62A91e1d49913C56157b4A4e03a962cEbC5F733',
        inboxAddress: '0x6097875C63313ACE4E505aAA4C53A044Da454397',
        intentSource: {
            counter: 0,
        },
        proving: {
            mechanism: provingMechanisms.cannon,
            l1BlockAddress: '0x4200000000000000000000000000000000000015',
            l2l1MessageParserAddress: '0x4200000000000000000000000000000000000016',
            outputRootVersionNumber: 0,
            settlementChain: {
                network: 'sepolia',
                id: networkIds.sepolia,
                contract: '0x05F9613aDB30026FFd634f38e5C4dFd30a197Fa1',
            },
        },
        // The following destination chains are useful for proving
        // destinationChains: [
        //   84532, // baseSepolia
        //   471923, // ecoTestnet
        //   421614, // arbitrumSepolia
        // ],
        usdcAddress: '0x5fd84259d66Cd46123540766Be93DFE6D43130D7',
        hyperlaneMailboxAddress: '0x6966b0E55883d49BFB24539356a2f8A673E02039',
        gasLimit: 5000000,
    },
    baseSepolia: {
        network: 'base-sepolia',
        chainId: networkIds.baseSepolia,
        proverContractAddress: '0xAdc0BBf74BB9b3A41f5b89cE8bC70f45D8CAA7f4',
        hyperProverContractAddress: '0x1fCF488B9375f3530e22D14f4D1866483F81b599',
        intentSourceAddress: '0xD62A91e1d49913C56157b4A4e03a962cEbC5F733',
        inboxAddress: '0x6097875C63313ACE4E505aAA4C53A044Da454397',
        intentSource: {
            counter: 0,
        },
        proving: {
            mechanism: provingMechanisms.cannon,
            l1BlockAddress: '0x4200000000000000000000000000000000000015',
            l2l1MessageParserAddress: '0x4200000000000000000000000000000000000016',
            outputRootVersionNumber: 0,
            settlementChain: {
                network: 'sepolia',
                id: networkIds.sepolia,
                // Dispute Game Factory address
                contract: '0xd6E6dBf4F7EA0ac412fD8b65ED297e64BB7a06E1',
                // Old L2 Ourput Oracle Address
                // contract: '0x84457ca9D0163FbC4bbfe4Dfbb20ba46e48DF254',
            },
        },
        // The following settlement contracts are useful for event listening
        settlementContracts: {
            ecoTestnet: '0xb3EDAE5AB86f16242018c7cED4fBCabb3c784951', // ecoTestnet L2 Output Oracle
        },
        // The following destination chains are useful for proving
        // destinationChains: [
        //   11155420, // optimismSepolia
        //   471923, // ecoTestnet
        //   421614, // arbitrumSepolia
        // ],
        usdcAddress: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
        hyperlaneMailboxAddress: '0x6966b0E55883d49BFB24539356a2f8A673E02039',
        gasLimit: 30000000,
    },
    ecoTestnet: {
        network: 'eco-testnet',
        chainId: networkIds.ecoTestnet,
        rpcUrl: 'https://eco-testnet.rpc.caldera.xyz/http',
        settlementNetwork: 'baseSepolia',
        proverContractAddress: '0x84D498b44f23Aaa620a72D6Bb99bc252A41aD6Eb',
        hyperProverContractAddress: '0x330e8bBD03d1D544EA2634599616E1F0268A031b',
        intentSourceAddress: '0xD62A91e1d49913C56157b4A4e03a962cEbC5F733',
        inboxAddress: '0x200b2417A9d0F79133C2b05b2C028B8A70392e66',
        intentSource: {
            counter: 0,
        },
        proving: {
            mechanism: 1,
            l1BlockAddress: '0x4200000000000000000000000000000000000015',
            l2l1MessageParserAddress: '0x4200000000000000000000000000000000000016',
            outputRootVersionNumber: 0,
            settlementChain: {
                network: 'baseSepolia',
                id: 84532,
                contract: '0xb3EDAE5AB86f16242018c7cED4fBCabb3c784951',
            },
        },
        // The following destination chains are useful for proving
        // destinationChains: [
        //   84532, // baseSepolia
        //   11155420, // optimismSepolia
        //   421614, // arbitrumSepolia
        // ],
        usdcAddress: '0xCf4bc4786C11eB28169C7dd7B630d2Ea48856708',
        hyperlaneMailboxAddress: '0x6966b0E55883d49BFB24539356a2f8A673E02039',
        gasLimit: 30000000,
    },
    arbitrumSepolia: {
        network: 'arbitrum-sepolia',
        chainId: 421614,
        settlementNetwork: 'sepolia',
        intentSourceAddress: '',
        proverContractAddress: '',
        inboxAddress: '',
        intentSource: {
            counter: 0,
        },
        proving: {
            mechanism: provingMechanisms.bedrock,
            l1BlockAddress: '0x4200000000000000000000000000000000000015',
            l2l1MessageParserAddress: '0x4200000000000000000000000000000000000016',
            l2OutputOracleSlotNumber: 3,
            outputRootVersionNumber: 0,
            settlementChain: {
                network: 'sepolia',
                id: networkIds.sepolia,
                // L2 Output Oracle Address
                contract: '0x4121dc8e48Bc6196795eb4867772A5e259fecE07',
            },
        },
        // The following destination chains are useful for proving
        // destinationChains: [
        //   84532, // baseSepolia
        //   11155420, // optimismSepolia
        //   471923, // ecoTestnet
        // ],
        usdcAddress: '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d',
        hyperlaneMailboxAddress: '0xc756cFc1b7d0d4646589EDf10eD54b201237F5e8',
        gasLimit: 30000000,
    },
    mantleSepolia: {
        network: 'mantleSepolia',
        chainId: networkIds.mantleSepolia,
        proverContractAddress: '',
        hyperProverContractAddress: '',
        intentSourceAddress: '',
        inboxAddress: '',
        intentSource: {
            counter: 0,
        },
        proving: {
            mechanism: provingMechanisms.bedrock,
            l1BlockAddress: '0x4200000000000000000000000000000000000015',
            l2l1MessageParserAddress: '0x4200000000000000000000000000000000000016',
            l2OutputOracleSlotNumber: 3,
            outputRootVersionNumber: 0,
            settlementChain: {
                network: 'sepolia',
                id: networkIds.sepolia,
                // L2 Output Oracle Address
                contract: '0x4121dc8e48Bc6196795eb4867772A5e259fecE07',
            },
        },
        usdcAddress: '',
        hyperlaneMailboxAddress: viem_1.zeroAddress, // until they deploy the real one
        gasLimit: 60000000000,
    },
    polygonSepolia: {
        network: 'polygonSepolia',
        chainId: networkIds.polygonSepolia,
        proverContractAddress: '',
        hyperProverContractAddress: '',
        intentSourceAddress: '',
        inboxAddress: '',
        intentSource: {
            counter: 0,
        },
        usdcAddress: '0x3c499c542cef5e3811e1192ce70d8cc03d5c3359',
        hyperlaneMailboxAddress: '0x5d934f4e2f797775e53561bB72aca21ba36B96BB',
        gasLimit: 30000000,
    },
    curtisTestnet: {
        network: 'curtisTestnet',
        chainId: networkIds.curtisTestnet,
        proverContractAddress: '',
        hyperProverContractAddress: '0x3e27B444B5E543cbFF449115DE4a36705a891F82',
        metalayerProverContractAddress: '0x05Ec3E181426a978327856097A6FB5aE9324296A',
        intentSourceAddress: '0xD7f316e387107b90dFBBDCb07bEC7280A729ce88',
        inboxAddress: '0x04fA0CeB5eaAf33084DDd4A7cda74F01767B4507',
        intentSource: {
            counter: 0,
        },
        usdcAddress: '0x3c499c542cef5e3811e1192ce70d8cc03d5c3359',
        hyperlaneMailboxAddress: '0x713085FaE11ef323960509547Fdda83130eb0B85',
        metalayerRouterAddress: '0xC41de2A4243e4304813c36Cd8952366DCb36106a',
        gasLimit: 30000000,
        proving: {
            mechanism: provingMechanisms.cannon,
            l1BlockAddress: '0x4200000000000000000000000000000000000015',
            l2l1MessageParserAddress: '0x4200000000000000000000000000000000000016',
            outputRootVersionNumber: 0,
            settlementChain: {
                network: 'sepolia',
                id: networkIds.sepolia,
                contract: '0x05F9613aDB30026FFd634f38e5C4dFd30a197Fa1',
            },
        },
    },
    mantaSepolia: {
        network: 'mantaSepolia',
        chainId: networkIds.mantaSepolia,
        proverContractAddress: '',
        hyperProverContractAddress: '',
        intentSourceAddress: '',
        inboxAddress: '',
        intentSource: {
            counter: 0,
        },
        usdcAddress: '0x6E4D0AEC0fd8081E1Fd1f17B9769600efC72B51c',
        hyperlaneMailboxAddress: '0xFD9e12938e57bF87980e474116B11C39Cea062Af',
        metalayerRouterAddress: '0xC41de2A4243e4304813c36Cd8952366DCb36106a',
        gasLimit: 30000000,
        proving: {
            mechanism: provingMechanisms.cannon,
            l1BlockAddress: '0x4200000000000000000000000000000000000015',
            l2l1MessageParserAddress: '0x4200000000000000000000000000000000000016',
            outputRootVersionNumber: 0,
            settlementChain: {
                network: 'sepolia',
                id: networkIds.sepolia,
                contract: '0x05F9613aDB30026FFd634f38e5C4dFd30a197Fa1',
            },
        },
    },
};
exports.networks = networks;
// TODO Update Bedrock with from BaseSepolia to ECOTestNet
// Need to Prove Sepolia Settlement World State
// Need to Prove BaseSepolia Settlement World State Using Cannon
// Need to Prove ECOTestNet Destination World State Using Bedrock
// Need to Prove Intent
const bedrock = {
    settlementChain: {
        blockNumber: '0x62cbc2', // 6474690n
        blockHash: '0x57d6ba806feacf4c3b79ab8035f611f31dc7062819b3077fe8441763233aa173',
        rlpEncodedBlockData: '0xf90248a0ae9b4e48bf206717ee2ea75dac6948139ab2033189b6409fdf5e683c58348bb0a01dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347943826539cbd8d68dcf119e80b994557b4278cec9fa0ee220dd138af438f2a2f49b6e065ed442983b95716730090096339d335b81b31a09fb6a748847497bd65ff7b724889dea80d9d5941f94a1c37e1f5ebd1848bee47a03739618fbe284b54b3d4927f3ab44de3784d13f55eb1dda27acc49e8f1439619b901002880840c881448e684930202fcb10664382128ee5001a20014a00610c63110480c099820a242a2a224862c25222c0ae0943c1fb0f322c61c9000129454ee0c190482214a818c03025820472e2f6bbe100d295d0405344021200e10030829200014a49d51ce00c01c3010060495082bf1c28801e0c0100c04092002510040037452c00000a108028025c101980f080201209145a50a01290c809330003d60e0859308831f3821499b80500107e020269f8343e0a0e020c3152cc2820a23d0001d020a980ad81a8204d0311430180e8001024017a250011400d600914000016008055244663015a78e000c24302008ca749046d7516e3acb270c944c440c8ac50a808362cbc28401c9c38083dbaafa8466b7ac6880a0b99e5b81b22c35e967ddc7e6ab1bf620ba68051a63659176b85811e4038b038688000000000000000084585652aea0630b54852a244a90de8f931bcd64a344f434f1db260c26ba8308fa7bee35ca34808405940000a01ef501e687352833f0e68bc1bab1125fcd9dc6fcca4a58354fa7f92e2b25b272',
        worldStateRoot: '0xee220dd138af438f2a2f49b6e065ed442983b95716730090096339d335b81b31',
    },
    baseSepolia: {
        endBatchBlock: '0xcc7205', // 13398533
        endBatchBlockHash: '0x77c9ad4c153d40d71ad30e0db356645bb885e5e4fec575fdf65b479b57f95adf',
        rlpEncodedendBatchBlockData: '0xf90244a095ddb8d285b9bd821c252bd76af6d8a64abf16886062ac038fa55be2ebd69226a01dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347944200000000000000000000000000000000000011a066cddd76f9f8f6f808fccd9d484461a5650b4bc24a9295107fda5937c40fb603a0e62e83f32d6f125ff67d7ba42b63793d22ab8f66a3449fe208f49346aac036fca0e66a0ed55b4164d21792a1e72cd69c5034c342dda3cd8291460257fcc34d398ab901000410550004500300000000100404822088140404100020001a202280004200008148801102404008a8160001040000000010960a020480040400222001262008480030100a040020004120080010008418252000000408200600000014001020884000009a0928011020282150000880084000000202808900002090008100010484421428080040002003240040045908000a002004004400001008116001008300121040000a2600d20301424422010122030010e0008004a3220800404204610428020020002040090000409900600600c2808a1800001000015401037000103000000004000082402010498000080c09208040d4200010115950202110008083cc72058402aea540840103340f8466ac42ea80a0dba0d32a82245357c7d1290dca20cc2c7174d92ac57db13100b7fcc6a8e8534d88000000000000000083e32374a056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b4218080a01299a962bcf8d78b8be8d7a6e222cd281dc00f15e9cf849ef44693d7c1ed71ee',
        messagePasserStateRoot: '0xb5a62a25cf193ab1dba3ab2f1308d78ca6fe7c9647beca5baa4708343ecbe245',
        endBatchBlockStateRoot: '0x66cddd76f9f8f6f808fccd9d484461a5650b4bc24a9295107fda5937c40fb603',
        worldStateRoot: '0x66cddd76f9f8f6f808fccd9d484461a5650b4bc24a9295107fda5937c40fb603',
        outputOracleStorageSlot: '0xc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f720f21',
        outputOracleStorageRoot: '0x1cdbed5afcc5d19f27a327c2a2d5b8bbdd4ecd950ae0f57095bd8bbdc399e747',
        storageProof: [
            '0xf90211a0441ec48633cad4622f0693e1df224641f65ec6ed73c9db92fa1f0ddb68d40c2ea03e9b598d0b475685330aebe9055e33199009c32ea204ca3ba5067d5e6fddf43fa00a7924a9c1a0497c994415bc27b5ac1d1b0f6d5c79f10c28957f067e955a2cc0a03d90b8241f14a371f3390a73f78d484d0091032c374ad3dff678f096fef81d06a052bd5105527b0690825b76fc386f94834d357d2dd6d98b8ea8b92fc707ed54e3a07acea1b9d053216231308602e1bc8140b3c884ac6531e9e34e10824510872295a091efdf984663c14c4305523443765bb5116e4f763705a26fbf34a67292232e9ea0ba972573c95f55d2b736c47d85ace9b6df3fda41e0422b5c62d041f822529a77a058caf32181ba84ff2e923990295a4058b477638606e2ad74a50ed953a29a4156a0ea426829f206c8a7fef8adbb7550305c29e8bf08950961d60d18e6896e46addaa028f7e4aa782b42d189eb84e7b929a798902ef763d2bd96ace781f2969c20615ba0cb8b8145af4da6dc5e967c43791b821c8ca084b1d3abe0d3465864737996f9cfa057ab6120cbd202849b4415a898abf990c4bf8d59bffb0e5e98e2c11b78aeca67a0476020a729732c4c60b014ca3cf1c2f5cc2c0ad2d81e5411bfb0dee661bdeb02a0cb37952b2e0dbed813e2618f48a775883c2503cd392bf0eb9aabff4641615beda01b535cc0c88a330299fc70b18099a8dd876971c2a9a46e79a4a19ca4d886144480',
            '0xf90211a06d7cf036778b108cb3a502c49db5d082cfd598e804e14292060daac61cd020c8a0872e54e996e98c7dda0983ebbe71bc4efbfcd171f250da445b44504f243dee18a052c3d9cd061ccfc4f584a4f267a2b08baba5e527b1f188cb3024e7e7957b5332a011f895d39fb8bc00da9dc6a7b9fda18d6756b6dd910297906fbebef0336f471ca06fa91a810fc18424bff02d024737c387d5955d1f83e3180a642b969875fea3aba08a63d08d934ac54d88a8f59bf1ffc78f8e78b858207e5d610198cd0c82e09b8ea0782150ccfa5baff3b943c02edfd386e25a450b7819a06beb8715a81f3cbe63cca0f64ae31931901eef42af36b911d8e65ab907232df0fa4f229b2b862dda0edc8ba065cdd55f68e94a9b900bdc1d0a7150ad149c65207f58b90f0a1a0ecffc5b941ca0f71cf8b6a485daee88ea1f9f1859dbbc683616c7223e2b49e91ba9b5415c863da0c399595ac0cedf33fa4a66316c22286ee544af7c76f72b48e711c50c5fdfa32fa0fbbd9b6fc3e70b7972bcaf291f25e3b5cdb3f90a55c29ccae0aec567f36851a5a00ddc0053ee7d5100d8c9f8f7b9d77a292566a05a0b4f28a2d5dcab0089e18d54a09b99923eb7c282b2cd938bb99eabd4fa1088a85e6c9e7b080ff6be470273c172a0057190be89c06f271f2cd6c5507ed456468b6c5610d992448446e872fe4817dea0996e400bbc7444267fbc7d1101e6f8fd177ca3ad6e764f48d9aff03ffee0043d80',
            '0xf901b1a0c4ccfb982e68ab7dda3f6e9fb678a03ec297a23136d4f1d87038945d16beaca6a0589b6ea4e3ec6e568294244eeb22d7a23da746eecf1c90b101b1915df7517e90a06fa718647867863d16f2fc2fca71da01209e1ef88e9599c929fdacc2b10ab36da0aedb34a113e5cccbdf92fb987fbadcf430506ab749ac1a622a7d8ca09add8108a0be07792cccaf0fbbae3e654e69b142321865cc3727e83120b23aeebd055b81a380a0735c1af000c8ee7f609bf23ef6b65eed3a685ab352b6d21261c9131a1a57b525a0a46bdbb6b6be62a48948b2b1a2e34cfcab220e23036fa5e53b2dc247c0d41eb3a08eb555daf77677944d89e0c67fd13a2dc1729d4e35d88095540070573a04ee11a0836119e240e4503598bfb7f40ac7f7dc0eed6eaa11abb4f7b331b8a80c614756a0bdaa4e1b70246cf24a74546cfd23652a48086f04d85bc8afdef9ed6c96ba8351a0489f4b442ae4ce2fe146c232f0f95e1818b766c611c952697ab28bcc33dedb8580a03b4990f81d4e89f317f42abc9c5f20e6d0ceefa478db7b0f204c6afa16bc9ae280a034b6a0bdaa0edd54bc5244d28c5a94e6d45f6ed7e95143ddddb9df0bc518c4a180',
            '0xf871808080a06dd34a891bdcb7e335cb46f5ea23e9a595f107054013dd6ab71198a426d6669b80808080a0d9eeca3de1bf11d73e139fa3e22e8179961d8707ffa1f70bfbe18a18faafcec38080a07e7af3f071a8074c49356621cbf31368bae45df858d1a010c0ac90001ac124be8080808080',
            '0xf8429f20b80b433c99941747d86a81ab090c4915d40ea810805fb7fa96c04bab73e1a1a0e9d09cfd1f37fe512729fda2b1f432c752e48c102e0d2f480d6a15478b9e70c3',
        ],
        accountProof: [
            '0xf90211a03b36b19e4e7f70e07935b315fea4969088b18a3fbd9a06678c9fc9c10f8123eaa06dbeafb5eb2cd654e09fc2ea8fd37c8aa7712df25d5eb691ea9752ee1e5fb6dfa0c3d6ae4e7dae0df97d71cb9a13191c07b18a10054696a306d80d4982d6c683cfa053898ba18743924ba9a396039ff77272f1ccc40c7cbf844448bea0688710026ca0726fd5645ec07a78d18a0c059662605b3e135a1253ae94d6cf9f3c3c654d5771a06a78e639d7f52b7888f541f0c1ce5dffdb9ba4cc687afbb8a44d25fc796f2d8ca01042a0edb3c58bd9f53735b1abee3681b0c81a698e819ee22381288eb6fa9b4ba00b5c8d003354268c1b59b76856e3d0dcddc1be3907562ae289c46fa7f2b79218a0573b6ee348a42c8490e3c06e1c642b73fec8c47432814fc6c1691c7e5bfbd0eca0826d44f1da25d9765562426dc0097747dd12ca5073cce4befb182f1b7c7a3825a0c843a4010c4877ea034156e989094635e6b46d668ac68f9829c0a1f0ba892403a0e6e699aff97558e4e8369f53cb04ae5b7ddb4574767c0021f6fcdcfb64174834a0b6193d549d43526a0adf858c12d75cfb8f9617572a09d9bb986bca67c428f671a0d43fc54794b663ac523e1ad600df68525ebafefe198bcfced0dfdcb7b08b00e2a010b1e7c54ff5386c974fe87b94ae24416e99a3f282bf8ec704eb5a8c8ec4cabda01b85c66231bbf6d3d0e628d2f23a1aa0e891c73425bdf03e7923d6b616cc788c80',
            '0xf90211a02b7a0c785c325a9ca62df27b0c54a3273bdca7d77a572c587c31359d58e02c35a072bc37ee7150e2e2892e0e0c433dce33badcc35449f0d8e527cd30c6b065cc5ea05ce6e3afd2084c420d52357a8d69d0a34176a2676ccce9679e23812708469e34a04b3c59a5c38f825b2f7be33cde149d775e3619c09267946be84d8aeb00846ee8a02342db9679a0caccb0ab08934ac6b34b6b0dfd090802b3256d96c5556f1d8cc8a0342d9705b08bad2ffc4de00b0dcf07d09142965feed43f529815993fabb33da7a0308c05443cec0c9f1e26c8ada53793c9400ad6043d0281f19e9d48806231092ca080f3a4c7d3de28f2c953b075a2be934fb5536d19c1e915a28e95d563a2e8f3e5a04bdd88d392a2080052eff58a5e29462340bb29ba6e0c13049e76093ec38215aea08d00af05aa2930c2d3adabc5f7c96b49093256d8643cdf20b8e0c5c908d8ca2aa037a7a1819b800d9db545a07dd0a00be09a70a1fba2030aaf74861d9c26aedc37a08f5a17427dab8678d0b42ed88204471b4f9302aeab5c524fe616559a6f1ef443a0db3cbd207b815155e8716b53cf962d60a6a5127605b7ac515c462cebb2c03ebca0bd60ed8d115d162b82f251dfbdb0f3ecf08c2f6eacf35b86c4788b2dad3cbf4ba03bbe52be3e02e1a99649551e364ba31036f57bc1016185790b3d59f9836ce245a05c95e8d1b4fb849ef1d3fc6a0ed71ebda00aa63eba705cb67343698786eda4c280',
            '0xf90211a080621425490671d8207c0761fbb4c71898386d0a3b363dba1d7c9ea374ea297ba0ed7c8d0533ccb07feca45982cb4b8917850f5d3e06b0d9a0af374cf3d46334f7a0d2ad83f855e8d21766ccd8006138be1e34043527f327b4389042e71cdad638a7a08ff64b37063d62d8ceaae2f17b483b0e614cd9fe015343e089ccc463b09b88eaa08c9841b1c607d0f6129980f81125d57efb60db2a2a32d5fae2c3ac90af2d92caa05e9960ad30212061ced3a059e47f4336de122fb25a5426a28a86e22ab998599ca0a0231b92ae804466fcbba946fee39f4bbc4481542c0e568969c8f4a7ed14eab4a0380956a6ed4eecb676c6c2f3fb11662a7629a185eb8aea283d17cff2be36436fa0b9c28621ba7fa59267e0531773589a674521d0678b59c8e71bc0887ffd0b75a2a062553cbbba6c0229a79928a80e9c53cabceff4d0069e4e05ff58cf0ad1370e10a05e56bad250462b319338e3ee5af736fd28721b7efc2dd0f0ca2f377e0534485ca033872d4ebed069d230cd4b63b6dec6a6dcd863757a3fd32b6db45b5b0df58505a0936d6f2f337f4a1295784855942cc1362333d6eccc1804ec51f717ae957a7de5a06cda074b5e63c6d69873b116164c81069701cc59d0cf8f9aba5959a2f6752c36a04743eb1071cee64604971f43c272be3a47120d26e177467150459c8a30bb5cfea08603a702286b78af0b7666c5e7e15fd18a9a88ef046cf5be0abe1e0b7efa455c80',
            '0xf90211a0fa28e5ccdeac3a7e3aef0c1a01931683bd84679535b4a65473cc711e486ead66a055ae4f646775da89e501fb7a9372e1b39229d851255443b4fc9157a14187da7ea00fb9d2d40c2a18f406f252d3ce9a37dfc5fbd11fa4f813a9d13d8b532f2d65e1a0b4cb41467eca82e57d0d0d0f213c000da17cc5892efc31e91a5a6ac69cbea6e5a08b20cdcec4f090354f28abfea9026c59a88a781113db3f0d2b17b6c98b34d16aa0af2f5de3831cd4af1296662577567e04bd6867ba9dc13e002e69090564ab4135a00030c6c3a84226b924436326a7be9a2e39f27a4aa5be2c704fd24f2cec2fe926a0f5957fe5a7c3a06644e585fd9fcb8bcdd57f5e9a1a1504db123b34be4c0b57fba0333b1640a6a0f29bb734c558aa306700b68d90d31012fee1489a968a30e53f0da0ff8ece70846a12c497c9278a6fc15999e8bb3e373eae46be109a9b358f314b28a09af2e536dfd05cf3ecd8671a805de66b0d7f8cafa94c7f2a4f7ae3aa93aef384a0902413ff2415280f9ad6bf95c536f5cb4f4425f6d78dad77e93fcffefe4724f2a03712ab8e249a46ae422f7e45c5ccee14efbfbe1c5899e40368c4186c2dfd96fca0fa7d8836f51dcc7d93ffd1a0807b2259c8c0dd378908fa0c0e976020cf785c39a09d1fa9d24fb256fbcdbaca29c80ca96e1890437524eeb5df9d30acb10fe7d445a0d5397f5ac97ad7a73230e72e8244e632b9cb8152d9e72d8da6efff082aaffa2480',
            '0xf90211a0920112b2c5a06bb9123ee3c384116a1163abbb33fcdb88ec4f21b94d45510c08a0f30fa536514c2f2b59d2f7224ccc1855fae8ce2110e55ac83775afdd853dc243a0ef1c2ff074d9098a68fc5286163e5998626ad7e626bea10a65eadbf6674e4cd7a06ea36f3eebf9b74b9bf0e2be6769391bfc1637a20af4447d3b7163113d095128a0e46ff70f7be247f8a6b249bfd3c0635ece6b1e7869d7bdcb1f1447bb7c965fe2a06e5e3f63c4e8c673f003bacb729b35c8431aea930dbd37107ca2edbecc9501dba0f588ebdb99a0e8581a0c701e9728af508b45e4dc20ac13edd6b44714671825eea0b455fd730d904984925bbb971b7fcb8d41d297f7170e21f652d63ca55f50aa1da0aa65df35add209cf31a385e37e1541bc59721463eae412d217e17b13beb23518a08a54f37b4ad5267d335fc8f6f6254df57041ef01c4f10b60100bfd374c359d93a056b7672d03dda474f9aa8fb9f248c300b49c8086a26d53dccbea1dc9c796309aa05b4a8f28b26dc40178e3b2e99e4beaae9f2d5f1041cd0c662dcfe8a672c4c2a8a0405be147e1dab59ec6a3b837830fa19b848756131be3bc7c55c0df6d238316eea0256e030a71ea4634d0eef541640173c7a634a7db27a345c3461b715214b37190a03448ec88db5d4aacdaeaac8b9ed428678c768c3a7265c95c8790d1f5eca91a1fa01641883c3e67a759ef7d834eee1817425b9aceddefae2e1c3663ffb988e1842580',
            '0xf8b180a04b92dcfa4e80db3ce13202af8df81ae4d97ce26f6e9fbc117006457321bc79b88080a09577b90ad4bcc2cf37e1e07ad52bc74a8ff52f57b2c324322340a918c775d4318080808080a08d160fb49fa058102c0fd98548129ccf65b44bba38e3a9384cf33dc885eeb04ea0a542c40b4794a1531add29c86f8d7dbc13ce3e6ed71f5da6831d5547f991d71a80a0b277d369cf7ddea2466f19c8e3aa3db28f2e86769b777d31f6ae6b4b34f8b52a808080',
            '0xf8679e2057996654adee0c3b6e5c0c065c296e7f2fd1cd315fd01853b12f5d018ab846f8440180a01cdbed5afcc5d19f27a327c2a2d5b8bbdd4ecd950ae0f57095bd8bbdc399e747a0fa8c9db6c6cab7108dea276f4cd09d575674eb0852c0fa3187e59e98ef977998',
        ],
        disputeGameFactory: {
            address: '0xd6E6dBf4F7EA0ac412fD8b65ED297e64BB7a06E1',
            faultDisputeGame: {
                creationTx: '0x25f0965510cd29f9d7cac6637bc694b71e7da369d7a5b264f4d648d584cc822b',
                listSlotNumber: 104,
                gameType: 0,
                rootClaim: '0x825d2d3c51ea0ebdf25199ebb3e9d5835b6d61c407ef388ae4cde1f592306c95',
                extraData: '0x0000000000000000000000000000000000000000000000000000000000cc7205',
                gameIndex: 232,
                // Hash uuid = getGameUUID(_gameType, _rootClaim, _extraData);
                // uuid_ = Hash.wrap(keccak256(abi.encode(_gameType, _rootClaim, _extraData)));
                // wrap https://docs.soliditylang.org/en/latest/types.html#user-defined-value-types
                // Hash https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/dispute/lib/LibUDT.sol#L174-L189
                gameUUId: '0x66ce5b8e8b9be86113976389cf5749af7db7e380cbcfd6edae9713b1d1ae2621',
                // GameId id = LibGameId.pack(_gameType, Timestamp.wrap(uint64(block.timestamp)), address(proxy_));
                // LibGameId is here https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/dispute/lib/LibUDT.sol#L82C1-L118C2
                gameId: '0x000000000000000066ac4364e6585806c6864d6a3285cc72961eb1ed7e078e2e',
                // '0x66997f68e611c3b8ec600691b9d16e54b433e03742e3b9d8',
                gameIdRLPEncoded: '0x9866ac4364e6585806c6864d6a3285cc72961eb1ed7e078e2e',
                // '0xdc1a0dba53f837978d5bafb52ebb7cd67f5cfb418c5ec060ebdc4bca53327769',
                gameIDStorageSlot: '0xa2153420d844928b4421650203c77babc8b33d7f2e7b450e2966db0c2209783b',
            },
            contractData: [
                '0x01b9', // nonce
                '0x', // balance
                '0x46de7af4f6c52fccafd1ac01f1300f96a10146bef38e05d28306a7c0ad3e68e2', // storageHash
                '0xfa8c9db6c6cab7108dea276f4cd09d575674eb0852c0fa3187e59e98ef977998', // codeHash
            ],
            stateRoot: '0x46de7af4f6c52fccafd1ac01f1300f96a10146bef38e05d28306a7c0ad3e68e2',
            codeHash: '0xfa8c9db6c6cab7108dea276f4cd09d575674eb0852c0fa3187e59e98ef977998',
            storageProof: [
                '0xf90211a06766f933062b6965850eacaf4c41b0c42da6739c93f19c03d5385f8a774e3d69a05289b4ebbef377d0df98b80c5a7458cad6cd8f76aac9bec97a917fe896c710d0a0ba287a855a2d93cadf855d73c08d72271381acdb12a6f49d11693e8931982022a0a6791e3a2143f05f709653cf19f9080ef61441e3c94580e586be97185b6299a6a003eef01084b4ae2bc049d3487ee65d3b24da31edcc9e14f12a4d11ce10ace04da08f062458b55daec428f35f3cec2a5989ca63df6b3a98d49032cd20ea48456f01a0e003b128aa35e80eec56ed23788beb6d9fdd2fc9b669013ce5a25711516c0d8aa014121709a57fd2479bd7edebf2c52c70330bd54524592c7c88c1d88c75f92865a059d420f414daa18cbea6e936a58853dfae5c05a44f3667961fc6acb273e8d7fba0b10acf33c0c521805ca65e4fb8a2f58f006326493b0b62fab04a209a59511855a06b0c9eb32dd0f2744cc8fb30585770ba20a50eda75c8e37042647d78df178081a0f3061ae75a87201d0ac13de2b2d0f9d0f134ed611fcfb6088d14020e7ed11059a099b90af70fd5e5df3a38669f9aa8b4f6a6e4c326f2c6875663782e0f38eb504ca0fab71fcc6f827ad64c65f91e93588ab6f12c23ef6245307d017435e167638f39a015876d5ce10e49e1622c8d3d290c74727fd842f5249f0ad478fad7090e9440bfa0218560caf8edf9bc875c896a37874e74ebdaa125dea119f51f05090e75df15c280',
                '0xf90211a016af422bc7d08844844e1bd3f70eb4c891a1691a52551e4787496700c798a632a0deb3728a924ba5e5e1c66b43d23263e7450447d226ac32531f322d30b463cf83a0c33f17cd1f33a5989a90a3801bc7e1f808a753e03522968afea6703cf4ccc7dea0dee11576396adb445fc969483c964dda550234316f5cb28fedfb2b493271139da09b9bbff882680dbe57a38bb01705f613887d6938aa626121a09efa313cf68864a047e855eb270f58a13e2cc1fb30c688944cdf6666c5ef1031f411710b0641e037a0379d61e7c971189ef134cdb94f8542fe6b93cd497d43a8d5f191de37f1d8822aa0b6479b6f4272f126d523f0799c794de6e32cb1997a4926eb734fe882bba3b272a035df77282a44585b06bd22db29b92411567932026dd78e3df99aa7eb233396ffa0f75c91fdc50378c393995b9cff2d0e4006280928b4e3ff10c3038dc583a903e6a04bcfd6597c3fcf39f31c2308d49ffa50165557d455b41bd2624e4aaf703a35efa0690cc86b707b94f239b29b2c1922279195aa4fe193acd09684de6852160100b3a003166a2fe631cb60f373f48add75ea3dd3ba65fe8f3388777146b62021e101c8a029d4901f85cbafaf9da496612bd46c42ea0c9041c19805cf26397fc18b3991f2a0d1ba748b0490eca319432df5895b61db3497e54e37a5809d348d50213e61fdeda03968c61a8986f43d15a141b509de8e04ec73d9962c7a8f75e3bf8bf0cf445e3d80',
                '0xf89180a014c3c31899b30f71a3109312db741f715c2783368fa4c3c62c6c3ee70d8359c7808080a05ac399487870851683cee3698ed08749baf909d733ec2181afd5e54693f4508e8080a045693c530dce67456e2881d7fb63c9a14b3d4e16d74cae63e555d1f7bc9b6a098080a0485717ffefa53d1e78ddc419bf2c6564d0e85a573ac66f4aa37bf289136b61a48080808080',
                '0xf83a9f3f2c6d1a3951f2f2bb133ee91885e61b076d25bdbb6fe17c27dfe4cf486934999866ac4364e6585806c6864d6a3285cc72961eb1ed7e078e2e',
            ],
            accountProof: [
                '0xf90211a0a081cc07d5dd11218fda0d60ee7e8a3ada6c4b59d84d6d47ac7c604d77ca1c38a0388a8a95dfcdc57da2cf26a824d48b6f62acb90c869dcb47d02da242de8e7234a0ab407658a840d50d981bf2c625dc4ac8fcb97c93f2af10f78efd1bafd221ef9ca027d8b29934ff5dfea853bb1ad86633c65452ac8dae5769746c607fbdd0d7e1ffa00f735a5169ac780da1b37476728c168d6582878d88ae24726557fddacfdc5656a032187c5d9674df7d628d38d1effe83ee4043ffffaeb35bc630b2679642ec969aa015d5d9c762783fe97aa3b7ba12ac069169c3a52e4a001ace0eb1afd7dc862671a0a63d981dcde44ce2b9a3d2edc554f115c26fd6c776af8e392224cc8f76d359cfa0e22b74bf6ad5a804107b17b650ac00cd3f76e4da70579cd529f36e3aff134ff1a0e10f3a324fb1f8b231d70da366a5b3b6039a08cb1c9832db1dd7f5dd5447f50fa0eefc8c8328582445f0bea95294fd7a177e9abbf7d2765826f098d2cdc94ac50da085f27769bdfec1c38d76befa163dc6ab777db8ef69798c7cd06621c2bcd691d7a08ef579049d109fac755d4a58bdf050ed4c8ab3e903d6a5392926872604e8f1baa06007daf05d3c810ccc4f02de9b223a4b5c86a6a1339375544a98de6611246733a088e92d0f74dedee648b2d4db368d6c4c0511113d4e4a28e3456c5880c8617743a092b5e6c7c7c0e141301270f51a8c54c92860b19728b82ca52131ba71391a8e5080',
                '0xf90211a0135587eb1bb7635cbe13d23d8806f188c76e088b73ae6642a5e091b3eb1b554ca01b6ed2930455f5ec2606af51ea48680c482cce8c9839da586713d9f9dc42645ea01d0951ba73ea35a96fc46db892bc676c52e8b1cda667d3cf7676c7a9560ebc21a0a33bd68f6183461cdbd46c2ac2a6a82110daf377df7ca65e845060660f8258b3a042e09b4f3f035cd8f9ec999b9167eac8abf87fbdb7c6d3630be373753072d950a0644e1638ea82a37eaa43337d1c961a8aa78173ce6b5891d9cb378bc3fc248d6ba0f012000b3ed905aee68ca997f760f61a25356615176bc5bf157a43814e542e36a032d091ec118200e9537556d26e7401388a82654f13806e53eee6215c6e641691a0270ee543527172c9c9330d1cd7e6748271eef93cd0e8746a836f05a9adf491f8a0b398818befcf8be66155bff233b93349ae254f845747c1a7f07f71d163062a93a0e0c3a00716d258c1b5ac35d23a4750cc6b260658399830f3868ad2356e142d58a0a78c08eafd3c2b82f4c8e59fb0e53d905ef17126c5103bba2c34c366d5da5399a016b04f1cd0abcf67b6eb6c5cf2e7ad9b1e34423ef373d5829e1b8f800873be6fa03db76dd318e18302d9c3bd52026be180cbfe1bba81fea968b1f4d679ceb9250da03b9929d67400f79534b7e3eacd14f93c6e1af3448e053c1e48fbcadad5889d5ca02b1bc70dd6f7052b73fcc754ffd0c49858d54c6841e1f8e3748ec002311aebfa80',
                '0xf90211a027048b4fd65d8f3024cbb726afb39c644a1a600df37e7693962eadb88b931d7fa02026ccfd0e1fcf3536666dc2067fcd9e266b15e61fef3d4ec0ebf2901ffacf36a066745da400563a4bf5205efa58181a5f2dbb0971f9b96a1295d912289e96911ca05d5b2d96373b1fbe420dec47ad4351af514f436448e58b3a1abead37fe0d9410a0da6738865ac3ae62fba0e3441af48d5e5c46d139a8ec1c6ab336e060e1268f9ba057de8520f913e90a7239e2c7c5a40336ddd7346419253256e662f7484e4a66f5a0fff6044fe5eefc1e9b92a28be3d4e81c9ddc197ad536b7ec8f1f33b96661a21ba035acce4965134da613e18cfeebfa8e803c4b2b55bac3832c3b4e313317adaeb8a0a8c7c3fc58b6347bd2b8446d0927e13d2c6d87ef0be8d0fdee5365fcc9043db1a0b8262630c50d2532707340251f0a4e5b64bbe3495a09e9685b45b710d9e18467a0552db30d42fcdb111d8ae0fde21385f463bac1a0b08b71dfb7cb76b3d768ee6ea058ce15183319e6e94998c449c9e3fb210e7c85da6c63685078678f1c99a6fcd7a04e41b2311df31a28db325f7dec7d81373518c50a1722203eddb2d3d0c3b06728a0405f3311bdefb3fb5b2dfa2d7dd67b217d2582350d16bcf7e5b53010cba1d10fa00a2dbbf422e28796cf4ab36137a3049daf073194178318c02cdf97771c96d990a0be0a30cbf1a565757df94b9d10bb89a71534a39656122960d6e0cf2a0fdd7a7e80',
                '0xf90211a026d2305408f672f1cf5bf64b92a948ac1eef22ce34e20d7e00e89855fe4cdac2a018451a42b4af625a82ccc5034b14320ff805ea716074f6ea86e4273068ad7c04a0b47e6d68a3cd526aceb7355ec52f750ab0080d07a9791f1e3b2eee375ce3a495a0fec7c83f0c3ce0259a1d28a3c24619480e7c1568358dbbf429961c3ac3e62a40a0618ff574eae38b9765d95442ef9f711a2441624ff196add56e0a3c6674337496a0dd173a1eb8dd112ae15e95deb2b9e443cb25f0094df812e0da587545be484b08a0dbb286531dad167318f65f105a6cd9cba9c7dea1340bfa02cf32776e93d83d4ca07595dbb20c3cf6b23245da00bc1438b89d0a6c3a21da600a023b6f70a2b99a59a0ac1d3efd9466a169ea00820cb1047b0ebd4e6a73e78d321fca4ee0ac991b7165a0d1ea10a8a3f1cdd2f3969e971adbf806f2ace1b980e2a7d39f41355b871b7bbda07a9dbea6f108c7f8778bad8973d47f7eb5e82a44f0af41a38fdf5e212c8b0df7a03d97e2cb41d86d742887ed04572b5d14850b1acc3080f85cd0d0bede8691ef4ca0cd24bc4e95fdeffb9d62358cc19e3da9ffe0eb1807cb6be039cf6300dae3af94a033dc8386af25481031eb9d947146959663b9ca96fc1b33658724725e86698690a03a43c51db61c4623608a78604fe5bc117ec6bd28e762f6d6256fda57f864f362a070a9342a30df74e4d0bf310347838e71493db5e469b44e3c8c515f1561833f6280',
                '0xf90211a08fed67abf7004bb19dfa5805e32c44c5f60cc72d3ab9ca50cfff6ac6cc5f5266a0f0968d31dabdbc12a35fd7079a002122cb2495d45adca2181813f24c9afc8a11a065743ebe9d2ae18cd64f194452a186dc71acb6ba4e1b79e0c76e5e0c4a8ceecba050571e198af1fef59be18c04a07a0ef81d6851b9989adb96626ac91bc1514262a04fc9fc90c18deb107c768f645a6a51366a0bd158ff62e27c744c0b63c86dd307a07586e471c234bc5eec5d46a4a1ef781d04b0e13593c601fb57b35b8edfc579fba0892fd503a8cc41dfb0f89a25954b6c53ca4222b4ea0c2e64a5497cb3734cb756a0838976a65e49d85d3b05090adbe9bf658ffbd7772bb49b65096769c4aef363eea04bf15646c6b797665f573362c76d476b854f63d8b834a430aaa64b7919d2a967a0302a7aab8ad691dfa1e0be2a73e64e697d2eb8b06740811e6ce4a495cf8334bca0f665dead6eb364689db923c0abe74c34fe3f53f5dcb58160500af336fcd18342a0dc0018711ed14c1d0cc43731721042ce7d93e6a127de0a01aff9a24e53ce370da07c5ee96db37e1db6178830a106c0587482d804730da0fc809cbe0f5d7ccb6450a0d3d62d6ae670378492ff3c188a7fd17ed5cd068f76ce28b87840e0b8ea70b751a018734d8fa3974f04b47f658b2d41f3959a2fca687eef3c402554465fe643a2ffa0f77dae7d02e995534162220a72dcd65bdd1063d3bb672a7ff7775ded4d812b5f80',
                '0xf901d1a02de11b015ea1ec6800dcf370c5e75ff846c8d3bc39628752f4de1f8428fdf9fc80a0bc09451657faee6fa3930f90ea7409943768b754e169d1af449e544573b27649a0f1f3cddff30069381d1b8aa0121bee76f9f139f01a04067dc55e440de87ebe2ca09c072cecc33dcc305986fc5c758b0e313de2beda2a4ac0ad181d7d6cfad73bfba0245c9b64bd6ae1e31e0e1d21496e3543a6043ffa1ec5244360428338b9cc11faa04653c3c9c6fcf3364a89accc43184d88114ce8230fd4ea9f180a823d37e8270e80a00ebd3783b6dd2a1ffdfe7206df6a703ae88d44a8a715baf77232f06e7e9b298ca077fb4c957c38b7a9f5ca8f0afa86e7220beda09d6d2a17594e13d95bfcb69fbba0edfbf72829e8462f0194c2c01b51511c0c72281959a1a5fb3034665769dfeac9a03a815f4886492585d44663ed11a5fe36b46c1e64430b04724994763d91015277a03814cec59de0221ec034b7098384c012b609c601afb4c9798786f06765271b93a0e13520173470f93b40fdaba3654c54d8778e0a1079613b9ea44f756d637aba72a0a721b2a81e18714c52049579da47648298186c64ba7406ddfe696359bf9d768ca04941e87d247047e0f545c006ef006f7a8ba601f823abea6073e91eef9bd187fb80',
                '0xf8518080808080808080808080a0343bf8f08e1c15798178e9ddd349ac6764963b760670b71a5d816837f899fddd8080a05d44d46f136d4939210c640ab3885711f819c68ff66a6c937da359f43e1046a98080',
                '0xf85180a0a3f0189e1a2a79f92e10167a0d889170e94f3ca945edc2b1ba4b8f2cce46ac27a0eb524f429e7439862ffe94eebf961970340162273ec743879df7d5f012b6fa3a8080808080808080808080808080',
                '0xf8689d200716a81cccf6697630b988c56807dfb1b0e315b814825d7bde0002ebb848f8468201b980a046de7af4f6c52fccafd1ac01f1300f96a10146bef38e05d28306a7c0ad3e68e2a0fa8c9db6c6cab7108dea276f4cd09d575674eb0852c0fa3187e59e98ef977998',
            ],
            storageHash: '0x46de7af4f6c52fccafd1ac01f1300f96a10146bef38e05d28306a7c0ad3e68e2',
        },
        faultDisputeGame: {
            address: '0xE6585806C6864D6a3285CC72961eB1Ed7e078E2E',
            stateRoot: '0xd1eed49f58046d229c1ea02111f45d462b113fa579eacb11ab6ae9ed5e809155',
            codeHash: '0xad7a75bebada3a307bd2279100436977806a55aba149b940e60303ff565fca8f',
            contractData: [
                '0x01', // nonce
                '0x', // balance
                '0xd1eed49f58046d229c1ea02111f45d462b113fa579eacb11ab6ae9ed5e809155', // storageHash
                '0xad7a75bebada3a307bd2279100436977806a55aba149b940e60303ff565fca8f', // codeHash
            ],
            accountProof: [
                '0xf90211a0a081cc07d5dd11218fda0d60ee7e8a3ada6c4b59d84d6d47ac7c604d77ca1c38a0388a8a95dfcdc57da2cf26a824d48b6f62acb90c869dcb47d02da242de8e7234a0ab407658a840d50d981bf2c625dc4ac8fcb97c93f2af10f78efd1bafd221ef9ca027d8b29934ff5dfea853bb1ad86633c65452ac8dae5769746c607fbdd0d7e1ffa00f735a5169ac780da1b37476728c168d6582878d88ae24726557fddacfdc5656a032187c5d9674df7d628d38d1effe83ee4043ffffaeb35bc630b2679642ec969aa015d5d9c762783fe97aa3b7ba12ac069169c3a52e4a001ace0eb1afd7dc862671a0a63d981dcde44ce2b9a3d2edc554f115c26fd6c776af8e392224cc8f76d359cfa0e22b74bf6ad5a804107b17b650ac00cd3f76e4da70579cd529f36e3aff134ff1a0e10f3a324fb1f8b231d70da366a5b3b6039a08cb1c9832db1dd7f5dd5447f50fa0eefc8c8328582445f0bea95294fd7a177e9abbf7d2765826f098d2cdc94ac50da085f27769bdfec1c38d76befa163dc6ab777db8ef69798c7cd06621c2bcd691d7a08ef579049d109fac755d4a58bdf050ed4c8ab3e903d6a5392926872604e8f1baa06007daf05d3c810ccc4f02de9b223a4b5c86a6a1339375544a98de6611246733a088e92d0f74dedee648b2d4db368d6c4c0511113d4e4a28e3456c5880c8617743a092b5e6c7c7c0e141301270f51a8c54c92860b19728b82ca52131ba71391a8e5080',
                '0xf90211a037370f1f72e8e148da1e3506c76af9cea6e414f58641e42d54a430a5e1a9316aa06b79df0d4592c8896c14d430bf14e186fae8550df75e09aec181ec691bc63f77a0bf5b9f98aff467a4c943e0b84109b87b25f404d9ebc68328177626a9d5584affa03aa70958fb02b1594b8a424d5b00ee197d3fed879d69b30f10cdeac396e84a80a076193c3942efeb352cbd8a96e5bed83ed15b2152d27c94977de204b24aa84a60a0bc1c2469a5a3cd95bfc97898640fbe54fd88fa29cbd8d3c36310993c689d48a7a09ba11f9b44df4cc79f273da9788bdfb3a797c6c861ae1b6965f2d7515227f61ca006808eb2d12d963b36e2f87585e861c091e2c5445669485a3084e41fc2c3c026a07ab2e2ed6604c258d88117fcf2edb3079614d4573e1b9dabd6b135ed03290b51a0a777b5f6784f364ce59c9c61e81b33bf1aa272583f4471f95cca1ef843b941e0a07ece8332b9ccbda9c13499a04f02319c197bb094a900942d1fd996895e15d4e4a080c18eb7c6c793da1c24eab3f14a0bd70523fcb2a24869c75900bbdbbda189b2a0d2d50ccf71cae7553d99c65a100e144f2bd5a5e6d1d7660c1b88047d20ba2807a0d86d32c803a2c23b5598d5816b8fe10e4e0b692d446519214d82e5d953e7faf7a058de34ff111e776925b978fa294aa260b27804cc2f6c9046cc1bac105c3d37f4a0a026ca01da8e7817c9417937d78a3a22e136681ec4f96dd237d6683c8d4561ef80',
                '0xf90211a0a8879596159ae0801cf4141866ec5ccb35b8eb9022c135435879d4e6405f6742a0f585b88a6092d5718ff8b1805009fdf149dd5c07007b4090d6c42807ee80efaaa05056f7e226ada5a3ca800c530717c91aa90ebf9d09e7e6f2c38e41d24d71cbcaa0d78a2853b341f0ab63034c13b46715a89587dc93b5ee8980fa3fc7e9de256523a0399897c581d81f9d3f0ea2428f6544275f8e9515a4397f9a7664fee39eb213e4a0b3004347de45cb8dad4a18f13f391a1e57b6b859d2b0d1957be138c6c34a6697a0c64d497fff9e469d0f74e144222a8f9bc6409ae52fdcf622088ab885f04f9420a07e27a2b4543b580c2595ab2b78561e132a02307acd93f2adf6c9031734c37e13a0da933784670d8c4c2b714fc5803224d11537ccdf635a09a037b829a0a9549fe3a097a4fd5fb9f81c06aed7b2a298624f7344f938d36e96f1fd9be9570b865bc60da0cfbaf64f212b723a099ed91ce9dbfa80dbe7478186674f4ccff4b02a83021974a02d01f1ed340d968577248ae09685fd79d7d17ede7d2626d556f37e442a91431da031d45e74fdf76adc1b736bf8e20511c94a0b7c4e2780bd73397a03071efdc82fa0a4b4a0b565315c3397cbaaf978b8128eb0696a62e5463db4220bb15b4cbdc5eba0c30d2765196ae20d35002b15ca30576e27d5bf5c7d9951d3e4a9d83be612a1a6a052a6d8239bd7805a0efce8d226a599983e344552e634e92bcc991f59cf67307c80',
                '0xf90211a0f6fc16da39dc6f00beb440ce82cdce056b6e7aa48dfbc8af6ca1bca78eaaa25aa0fdc70ac036c6b179373353943b0651935c4d075cc5547fdc55a5930f7e47bd98a02f2ce96f4448b35b78fcb822e23c6bea7f3d84496c7e9f8a25b25ed9b182905da08fa448b9e09a304e0166c1c90b4bd2c792287118e9f02525c9c54560a423c1a1a0accd1895b70600329b34106a75552736b0618ff73158eaf84159b3f220d058f2a08ade1b637e1ab6bc54082f14cf139f707f00e3425a231407046b1513449a57cda0867f433a6ade0f3c46077fc8038d275acdac92b4588125f63deebad88ead4a31a061344791c25af7ca3017f433fd40e563bcc4eeb4a6efb4297dbfb6f9558524faa0cc4bba4114781020e671149c865ac95d6b0f399e62ab398786c24a8d0e07ca89a02ecedaa55e265a43d197ab44efdeed6d0f29b2f19eaa6d5fad4040e7cff837b8a019b4f088394f88debd2e732cd813684223ff79447ff6498e83d648d68a37612aa039e30ffcc963ce4db578224538b747c20653e5073198486c787ec8f9d5a3e0dca01c3ec04d06de108459d392745439e5d28a6e6d875c89c6620fc5a499d20629f6a026c471d7c0c8c046c3fe0e6cff19a49ef94a7fb6323804803a54fb7f426b9d7ea0d47266f7fc2a44f938146cebaca3a17bdedd1d42ea40f6487336b663ad747ba8a01d4b903e881918b03f88b43b0c6230a1ce10e48c774b74c7cb7acece2c51753480',
                '0xf90211a08d8a85b727a9d4c05d7ac52b4f84ac815b6e4badf3d9693e7de47cfa18c5a36da0b3fb3d9e4f96d028a6b0fe5b70804d1a538d9f27d584cc83e2de95adffdc7815a00089e920bfe5b57f3d6f8d9a8c5830584c5249ba5ad075d291654988e9f01d14a0ef5c68a15d82df98a09f6c26ee6dc840f585e3c3f10068d41b5887aeefbb18d9a0ce25e93ad9c16ebaee1d72e4ce5a3df568cd1bfe68c206ac829c46d44ad73868a03d6d5ce19d98fc3dffc5f0da23518e6a7e714fec63e6dcdd3cfdb446125b1e04a0dfc594e7a0b2f98289ab087c184074943bd40ef2ed07d32367142e62f1f43cb5a025ea56f4b5fe80e267b94745b6aaf606d8fc8a9724c442f3cc9e415c40dd436fa0be1e927c0579797400947c0210844b7941c8be052b94869cb63770b5c96512d9a0bb5a10287892d684a8ab83cda264bab341c5a0c0e972d704e10e9beaaa9a0c6fa0061e6252978ba45d1b9c1bf22e60f54fab8e6f38f4805d3862047817f1f501fca0c6d89ee227fe5d410a229dc75a0267f4e150f40335615fb549965237f6cae04aa02f94c1b895cbc90a7fcf7d04816a3afc4f9d06e65ce85a31b4d48c224ac631fba068299c5b198ba00660b14045dc7d206442d839dde24be7fa389e5d49866d7c79a0a98198ba15a9d43f27157020aaa7bc9078a39a16a69bcbb782c15e3e9a27a5c0a096ba68fb967123f190ce3fe533438107536241cf5865c74200e5a6274c94cb9380',
                '0xf901b1a09040e30c8d9b5a1349ad41b0a83e0656d789f0ce1405adb6c13956d6e454d32280a088a332fbe067f3ef1e09eeaf8e63102ccbcb8ffc32d42215ec353b6faf84d7d9a003a3ec16824a053f61960e1906604ee64ec540676951ae11911241a37a917848a019b53af68395051d20ed4b088882de2eaef57f8f6d37a04a5e6b4a40980c0dc9a057e4e39b28d4b0db501294ee51c5b8310fcd6d1dbc4b7cb25bd80616a2b10c3aa0748d3cbfb43496a664a4d88fb3f30618d37a262e519ed7f1d090a30b4d942c43a03b60a7af5382822f80a73d9877186abb78804e575d58e456f06661b45646394180a048a3b52ac4f60d4160bc5c405506f211d7e4413e9826071a926aff9b78a9c567a0b84bf1ebe68b11e049c88f0f47cdf3dd2dc70ee5b25edc2681986cffde630a6fa0710d28b62db5ddb12513e40847c815415c526a396608475cc826ae04f7730eb5a00a2a74f30edb95de7465a8b3eeffd3850cd160a7d9a1f5ef03a78b608964884ea08b87be225fa7c283aaae7436aeff310b1ea756ec07c8e38f4f4fcf632f59613d80a07db76191f754dea6b417fbafb3eac2d554ebe53b5f189cc625db1ec6be74079a80',
                '0xf8518080a02b4285bdef7068bb3dd396129662a5a901295db47d8052ac19cf33e4613783de8080a04e20e916050adb13c3d3b6fbd058a3656a831f31dd11b5fed3224d89ec484cd68080808080808080808080',
                '0xf8669d30f80ecc747f77bf1e061966fadb22545ca79f3ca193c54fce7fc06ad5b846f8440180a0d1eed49f58046d229c1ea02111f45d462b113fa579eacb11ab6ae9ed5e809155a0ad7a75bebada3a307bd2279100436977806a55aba149b940e60303ff565fca8f',
            ],
            status: {
                storageData: '0x000000000000000000000000000001020000000066b0e0ec0000000066ac4364',
                storage: {
                    // Note the fields are inserted into the slot data in reverse order
                    createdAt: 1722565476, // uin64 offset 0: value 000000006689aa08
                    resolvedAt: 1722867948, // uint64 offset 8 : value 00000000668e4784
                    gameStatus: 2, // enum GameStatus offset 16: uint8 value 02
                    initialized: 1, // bool offset 17: value 01 (true)
                    l2BlockNumberChallenged: 0, // bool offset 18 value 00 (false)
                    filler: '0x00000000000000000000000000', // 13 bytes
                },
                storageSlot: '0x0000000000000000000000000000000000000000000000000000000000000000',
                storageProof: [
                    '0xf9011180a0c52caf0505888b98c4fdb6cc7fb993c8bfa0d2493c4a2232714597de0e30f93ba0a45972e0e9b41beea9353b4baf31bec3887b37ab6afb6dff65461d698f4e755f80a0c8d8343191741f6635e15c60124fe6139eb6a0bcff26bd218bcea6aa2ba9d5d780a0e25896acad5eaaaee6448a519b0a70703e204cfbfd24dbf0d8f1f9440fd1b76380808080a083d6f825867f6cd80c47813bb5ddba011af81f5307161638e071b35d78cb2355a08a817362bd366f643cf451342d0f4389ff30ccc1b0b57d1406a7dbfd41403114a0755be9568051fc4ea933f0f5c7aadc8a41111cdedc7126493d8619e47b6d34e080a03962f67c3da55876fa9c8136e015783a47e3f7f7afe3b5fb7e21a41bb474488c80',
                    '0xf851808080808080808080a024a86bc7418be3f6190af1879fc2850bd82f6e3152dc09bdeff4d3c6f02488038080808080a07ec6836338079e0c7d9bf221bfefa6b3bfec6c8b7eb60ed43240c1f84f99bf6880',
                    '0xf5a0200decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563939201020000000066b0e0ec0000000066ac4364',
                ],
            },
            rootClaim: {
                storageData: '0x825d2d3c51ea0ebdf25199ebb3e9d5835b6d61c407ef388ae4cde1f592306c95',
                storageSlot: '0x405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ad1',
                storageProof: [
                    '0xf9011180a0c52caf0505888b98c4fdb6cc7fb993c8bfa0d2493c4a2232714597de0e30f93ba0a45972e0e9b41beea9353b4baf31bec3887b37ab6afb6dff65461d698f4e755f80a0c8d8343191741f6635e15c60124fe6139eb6a0bcff26bd218bcea6aa2ba9d5d780a0e25896acad5eaaaee6448a519b0a70703e204cfbfd24dbf0d8f1f9440fd1b76380808080a083d6f825867f6cd80c47813bb5ddba011af81f5307161638e071b35d78cb2355a08a817362bd366f643cf451342d0f4389ff30ccc1b0b57d1406a7dbfd41403114a0755be9568051fc4ea933f0f5c7aadc8a41111cdedc7126493d8619e47b6d34e080a03962f67c3da55876fa9c8136e015783a47e3f7f7afe3b5fb7e21a41bb474488c80',
                    '0xf851808080a0bcf244817350e840bc02bd7cd6eb75b3ad4912a2b24da9135c0542105b6ed9f18080a0ffc8de2f5bfbf723124acf2fae24376730240ad1d809a16a76d1479c9444df4b80808080808080808080',
                    '0xf843a020b7834d611e25670b584f73a3e810d0a47c773fe173fc6975449e876b0a6a70a1a0825d2d3c51ea0ebdf25199ebb3e9d5835b6d61c407ef388ae4cde1f592306c95',
                ],
            },
        },
    },
    destinationChain: {
        endBatchBlock: '0xaadc0', // 699840
        endBatchBlockHash: '0x8b7f427e5ae98e32bd7b16d80e74d073b0655ebbf7f0f01d9f97cc0974efc58d',
        rlpEncodedBlockData: '0xf90240a04058200d79e832f3983293a43cdd2297d767f1b7cbdf5faf07a95bcdf8cb3e9ea01dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347944200000000000000000000000000000000000011a01d1c3367a68dfd1e730f2e728a2bc7d95bc1f6881d1051751e2536370736ee39a05e88b285ac79dcdf849d1ab4f9cf2dae6d667bbf0b975344f78f0de28427e307a0f234d4d339fd16e8047199bef50d661bfebf89007bdb2c1769a8c3d8ad1943c5b901000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080830aadc08401c9c38082c0fe8466ac3b8680a04dd209338ca38bdaea06080a46137051878f8c06354304e91a69e5926c16d5e388000000000000000081fca056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b4218080a07ad6620844fe7bec2b3f374f1100088dcc24dee8e6d8b3d30c11ab539f88c1b5',
        // inboxContract: '0xCfC89c06B5499ee50dfAf451078D85Ad71D76079',
        // inboxStorageRoot:
        //   '0x02db022d2959526a910b41f5686736103098af4ba16c5e014e0255e0289bcc04',
        worldStateRoot: '0x1d1c3367a68dfd1e730f2e728a2bc7d95bc1f6881d1051751e2536370736ee39',
        messageParserStateRoot: '0x8ed4baae3a927be3dea54996b4d5899f8c01e7594bf50b17dc1e741388ce3d12',
        outputOracleStorageSlot: '0xc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f720f21',
        outputOracleStorageRoot: '0x1cdbed5afcc5d19f27a327c2a2d5b8bbdd4ecd950ae0f57095bd8bbdc399e747',
        batchIndex: 2915,
        // //   l2BatchLatestBlockHash:
        // //     '0x38a352d17ebab79b125d97f331a7b6cec88ce80ae858a12054391781ca77fe6d',
        storageProof: [
            '0xf90211a0441ec48633cad4622f0693e1df224641f65ec6ed73c9db92fa1f0ddb68d40c2ea03e9b598d0b475685330aebe9055e33199009c32ea204ca3ba5067d5e6fddf43fa00a7924a9c1a0497c994415bc27b5ac1d1b0f6d5c79f10c28957f067e955a2cc0a03d90b8241f14a371f3390a73f78d484d0091032c374ad3dff678f096fef81d06a052bd5105527b0690825b76fc386f94834d357d2dd6d98b8ea8b92fc707ed54e3a07acea1b9d053216231308602e1bc8140b3c884ac6531e9e34e10824510872295a091efdf984663c14c4305523443765bb5116e4f763705a26fbf34a67292232e9ea0ba972573c95f55d2b736c47d85ace9b6df3fda41e0422b5c62d041f822529a77a058caf32181ba84ff2e923990295a4058b477638606e2ad74a50ed953a29a4156a0ea426829f206c8a7fef8adbb7550305c29e8bf08950961d60d18e6896e46addaa028f7e4aa782b42d189eb84e7b929a798902ef763d2bd96ace781f2969c20615ba0cb8b8145af4da6dc5e967c43791b821c8ca084b1d3abe0d3465864737996f9cfa057ab6120cbd202849b4415a898abf990c4bf8d59bffb0e5e98e2c11b78aeca67a0476020a729732c4c60b014ca3cf1c2f5cc2c0ad2d81e5411bfb0dee661bdeb02a0cb37952b2e0dbed813e2618f48a775883c2503cd392bf0eb9aabff4641615beda01b535cc0c88a330299fc70b18099a8dd876971c2a9a46e79a4a19ca4d886144480',
            '0xf90211a06d7cf036778b108cb3a502c49db5d082cfd598e804e14292060daac61cd020c8a0872e54e996e98c7dda0983ebbe71bc4efbfcd171f250da445b44504f243dee18a052c3d9cd061ccfc4f584a4f267a2b08baba5e527b1f188cb3024e7e7957b5332a011f895d39fb8bc00da9dc6a7b9fda18d6756b6dd910297906fbebef0336f471ca06fa91a810fc18424bff02d024737c387d5955d1f83e3180a642b969875fea3aba08a63d08d934ac54d88a8f59bf1ffc78f8e78b858207e5d610198cd0c82e09b8ea0782150ccfa5baff3b943c02edfd386e25a450b7819a06beb8715a81f3cbe63cca0f64ae31931901eef42af36b911d8e65ab907232df0fa4f229b2b862dda0edc8ba065cdd55f68e94a9b900bdc1d0a7150ad149c65207f58b90f0a1a0ecffc5b941ca0f71cf8b6a485daee88ea1f9f1859dbbc683616c7223e2b49e91ba9b5415c863da0c399595ac0cedf33fa4a66316c22286ee544af7c76f72b48e711c50c5fdfa32fa0fbbd9b6fc3e70b7972bcaf291f25e3b5cdb3f90a55c29ccae0aec567f36851a5a00ddc0053ee7d5100d8c9f8f7b9d77a292566a05a0b4f28a2d5dcab0089e18d54a09b99923eb7c282b2cd938bb99eabd4fa1088a85e6c9e7b080ff6be470273c172a0057190be89c06f271f2cd6c5507ed456468b6c5610d992448446e872fe4817dea0996e400bbc7444267fbc7d1101e6f8fd177ca3ad6e764f48d9aff03ffee0043d80',
            '0xf901b1a0c4ccfb982e68ab7dda3f6e9fb678a03ec297a23136d4f1d87038945d16beaca6a0589b6ea4e3ec6e568294244eeb22d7a23da746eecf1c90b101b1915df7517e90a06fa718647867863d16f2fc2fca71da01209e1ef88e9599c929fdacc2b10ab36da0aedb34a113e5cccbdf92fb987fbadcf430506ab749ac1a622a7d8ca09add8108a0be07792cccaf0fbbae3e654e69b142321865cc3727e83120b23aeebd055b81a380a0735c1af000c8ee7f609bf23ef6b65eed3a685ab352b6d21261c9131a1a57b525a0a46bdbb6b6be62a48948b2b1a2e34cfcab220e23036fa5e53b2dc247c0d41eb3a08eb555daf77677944d89e0c67fd13a2dc1729d4e35d88095540070573a04ee11a0836119e240e4503598bfb7f40ac7f7dc0eed6eaa11abb4f7b331b8a80c614756a0bdaa4e1b70246cf24a74546cfd23652a48086f04d85bc8afdef9ed6c96ba8351a0489f4b442ae4ce2fe146c232f0f95e1818b766c611c952697ab28bcc33dedb8580a03b4990f81d4e89f317f42abc9c5f20e6d0ceefa478db7b0f204c6afa16bc9ae280a034b6a0bdaa0edd54bc5244d28c5a94e6d45f6ed7e95143ddddb9df0bc518c4a180',
            '0xf871808080a06dd34a891bdcb7e335cb46f5ea23e9a595f107054013dd6ab71198a426d6669b80808080a0d9eeca3de1bf11d73e139fa3e22e8179961d8707ffa1f70bfbe18a18faafcec38080a07e7af3f071a8074c49356621cbf31368bae45df858d1a010c0ac90001ac124be8080808080',
            '0xf8429f20b80b433c99941747d86a81ab090c4915d40ea810805fb7fa96c04bab73e1a1a0e9d09cfd1f37fe512729fda2b1f432c752e48c102e0d2f480d6a15478b9e70c3',
        ],
        accountProof: [
            '0xf90211a03b36b19e4e7f70e07935b315fea4969088b18a3fbd9a06678c9fc9c10f8123eaa06dbeafb5eb2cd654e09fc2ea8fd37c8aa7712df25d5eb691ea9752ee1e5fb6dfa0c3d6ae4e7dae0df97d71cb9a13191c07b18a10054696a306d80d4982d6c683cfa053898ba18743924ba9a396039ff77272f1ccc40c7cbf844448bea0688710026ca0726fd5645ec07a78d18a0c059662605b3e135a1253ae94d6cf9f3c3c654d5771a06a78e639d7f52b7888f541f0c1ce5dffdb9ba4cc687afbb8a44d25fc796f2d8ca01042a0edb3c58bd9f53735b1abee3681b0c81a698e819ee22381288eb6fa9b4ba00b5c8d003354268c1b59b76856e3d0dcddc1be3907562ae289c46fa7f2b79218a0573b6ee348a42c8490e3c06e1c642b73fec8c47432814fc6c1691c7e5bfbd0eca0826d44f1da25d9765562426dc0097747dd12ca5073cce4befb182f1b7c7a3825a0c843a4010c4877ea034156e989094635e6b46d668ac68f9829c0a1f0ba892403a0e6e699aff97558e4e8369f53cb04ae5b7ddb4574767c0021f6fcdcfb64174834a0b6193d549d43526a0adf858c12d75cfb8f9617572a09d9bb986bca67c428f671a0d43fc54794b663ac523e1ad600df68525ebafefe198bcfced0dfdcb7b08b00e2a010b1e7c54ff5386c974fe87b94ae24416e99a3f282bf8ec704eb5a8c8ec4cabda01b85c66231bbf6d3d0e628d2f23a1aa0e891c73425bdf03e7923d6b616cc788c80',
            '0xf90211a02b7a0c785c325a9ca62df27b0c54a3273bdca7d77a572c587c31359d58e02c35a072bc37ee7150e2e2892e0e0c433dce33badcc35449f0d8e527cd30c6b065cc5ea05ce6e3afd2084c420d52357a8d69d0a34176a2676ccce9679e23812708469e34a04b3c59a5c38f825b2f7be33cde149d775e3619c09267946be84d8aeb00846ee8a02342db9679a0caccb0ab08934ac6b34b6b0dfd090802b3256d96c5556f1d8cc8a0342d9705b08bad2ffc4de00b0dcf07d09142965feed43f529815993fabb33da7a0308c05443cec0c9f1e26c8ada53793c9400ad6043d0281f19e9d48806231092ca080f3a4c7d3de28f2c953b075a2be934fb5536d19c1e915a28e95d563a2e8f3e5a04bdd88d392a2080052eff58a5e29462340bb29ba6e0c13049e76093ec38215aea08d00af05aa2930c2d3adabc5f7c96b49093256d8643cdf20b8e0c5c908d8ca2aa037a7a1819b800d9db545a07dd0a00be09a70a1fba2030aaf74861d9c26aedc37a08f5a17427dab8678d0b42ed88204471b4f9302aeab5c524fe616559a6f1ef443a0db3cbd207b815155e8716b53cf962d60a6a5127605b7ac515c462cebb2c03ebca0bd60ed8d115d162b82f251dfbdb0f3ecf08c2f6eacf35b86c4788b2dad3cbf4ba03bbe52be3e02e1a99649551e364ba31036f57bc1016185790b3d59f9836ce245a05c95e8d1b4fb849ef1d3fc6a0ed71ebda00aa63eba705cb67343698786eda4c280',
            '0xf90211a080621425490671d8207c0761fbb4c71898386d0a3b363dba1d7c9ea374ea297ba0ed7c8d0533ccb07feca45982cb4b8917850f5d3e06b0d9a0af374cf3d46334f7a0d2ad83f855e8d21766ccd8006138be1e34043527f327b4389042e71cdad638a7a08ff64b37063d62d8ceaae2f17b483b0e614cd9fe015343e089ccc463b09b88eaa08c9841b1c607d0f6129980f81125d57efb60db2a2a32d5fae2c3ac90af2d92caa05e9960ad30212061ced3a059e47f4336de122fb25a5426a28a86e22ab998599ca0a0231b92ae804466fcbba946fee39f4bbc4481542c0e568969c8f4a7ed14eab4a0380956a6ed4eecb676c6c2f3fb11662a7629a185eb8aea283d17cff2be36436fa0b9c28621ba7fa59267e0531773589a674521d0678b59c8e71bc0887ffd0b75a2a062553cbbba6c0229a79928a80e9c53cabceff4d0069e4e05ff58cf0ad1370e10a05e56bad250462b319338e3ee5af736fd28721b7efc2dd0f0ca2f377e0534485ca033872d4ebed069d230cd4b63b6dec6a6dcd863757a3fd32b6db45b5b0df58505a0936d6f2f337f4a1295784855942cc1362333d6eccc1804ec51f717ae957a7de5a06cda074b5e63c6d69873b116164c81069701cc59d0cf8f9aba5959a2f6752c36a04743eb1071cee64604971f43c272be3a47120d26e177467150459c8a30bb5cfea08603a702286b78af0b7666c5e7e15fd18a9a88ef046cf5be0abe1e0b7efa455c80',
            '0xf90211a0fa28e5ccdeac3a7e3aef0c1a01931683bd84679535b4a65473cc711e486ead66a055ae4f646775da89e501fb7a9372e1b39229d851255443b4fc9157a14187da7ea00fb9d2d40c2a18f406f252d3ce9a37dfc5fbd11fa4f813a9d13d8b532f2d65e1a0b4cb41467eca82e57d0d0d0f213c000da17cc5892efc31e91a5a6ac69cbea6e5a08b20cdcec4f090354f28abfea9026c59a88a781113db3f0d2b17b6c98b34d16aa0af2f5de3831cd4af1296662577567e04bd6867ba9dc13e002e69090564ab4135a00030c6c3a84226b924436326a7be9a2e39f27a4aa5be2c704fd24f2cec2fe926a0f5957fe5a7c3a06644e585fd9fcb8bcdd57f5e9a1a1504db123b34be4c0b57fba0333b1640a6a0f29bb734c558aa306700b68d90d31012fee1489a968a30e53f0da0ff8ece70846a12c497c9278a6fc15999e8bb3e373eae46be109a9b358f314b28a09af2e536dfd05cf3ecd8671a805de66b0d7f8cafa94c7f2a4f7ae3aa93aef384a0902413ff2415280f9ad6bf95c536f5cb4f4425f6d78dad77e93fcffefe4724f2a03712ab8e249a46ae422f7e45c5ccee14efbfbe1c5899e40368c4186c2dfd96fca0fa7d8836f51dcc7d93ffd1a0807b2259c8c0dd378908fa0c0e976020cf785c39a09d1fa9d24fb256fbcdbaca29c80ca96e1890437524eeb5df9d30acb10fe7d445a0d5397f5ac97ad7a73230e72e8244e632b9cb8152d9e72d8da6efff082aaffa2480',
            '0xf90211a0920112b2c5a06bb9123ee3c384116a1163abbb33fcdb88ec4f21b94d45510c08a0f30fa536514c2f2b59d2f7224ccc1855fae8ce2110e55ac83775afdd853dc243a0ef1c2ff074d9098a68fc5286163e5998626ad7e626bea10a65eadbf6674e4cd7a06ea36f3eebf9b74b9bf0e2be6769391bfc1637a20af4447d3b7163113d095128a0e46ff70f7be247f8a6b249bfd3c0635ece6b1e7869d7bdcb1f1447bb7c965fe2a06e5e3f63c4e8c673f003bacb729b35c8431aea930dbd37107ca2edbecc9501dba0f588ebdb99a0e8581a0c701e9728af508b45e4dc20ac13edd6b44714671825eea0b455fd730d904984925bbb971b7fcb8d41d297f7170e21f652d63ca55f50aa1da0aa65df35add209cf31a385e37e1541bc59721463eae412d217e17b13beb23518a08a54f37b4ad5267d335fc8f6f6254df57041ef01c4f10b60100bfd374c359d93a056b7672d03dda474f9aa8fb9f248c300b49c8086a26d53dccbea1dc9c796309aa05b4a8f28b26dc40178e3b2e99e4beaae9f2d5f1041cd0c662dcfe8a672c4c2a8a0405be147e1dab59ec6a3b837830fa19b848756131be3bc7c55c0df6d238316eea0256e030a71ea4634d0eef541640173c7a634a7db27a345c3461b715214b37190a03448ec88db5d4aacdaeaac8b9ed428678c768c3a7265c95c8790d1f5eca91a1fa01641883c3e67a759ef7d834eee1817425b9aceddefae2e1c3663ffb988e1842580',
            '0xf8b180a04b92dcfa4e80db3ce13202af8df81ae4d97ce26f6e9fbc117006457321bc79b88080a09577b90ad4bcc2cf37e1e07ad52bc74a8ff52f57b2c324322340a918c775d4318080808080a08d160fb49fa058102c0fd98548129ccf65b44bba38e3a9384cf33dc885eeb04ea0a542c40b4794a1531add29c86f8d7dbc13ce3e6ed71f5da6831d5547f991d71a80a0b277d369cf7ddea2466f19c8e3aa3db28f2e86769b777d31f6ae6b4b34f8b52a808080',
            '0xf8679e2057996654adee0c3b6e5c0c065c296e7f2fd1cd315fd01853b12f5d018ab846f8440180a01cdbed5afcc5d19f27a327c2a2d5b8bbdd4ecd950ae0f57095bd8bbdc399e747a0fa8c9db6c6cab7108dea276f4cd09d575674eb0852c0fa3187e59e98ef977998',
        ],
        contractData: [
            '0x01',
            '0x',
            '0x1cdbed5afcc5d19f27a327c2a2d5b8bbdd4ecd950ae0f57095bd8bbdc399e747', // storageHash
            '0xfa8c9db6c6cab7108dea276f4cd09d575674eb0852c0fa3187e59e98ef977998', // codeHash
        ],
    },
    intent: {
        creator: actors.intentCreator,
        destinationChainId: networkIds.ecoTestnet,
        intentHash: '0x527060a732792b125122358a61ba70055678e24dd2490c85616fa932fa30fc24',
        intermediateHash: '0xe869aee222c68b33143669109d32cc4679c0ceabbcb5f0e64b2dee58c26df250',
        batchIndex: 2915,
        storageProof: [
            '0xf8518080a00bacadab995410b2b2b5d439313200f32d31c1bda0cb91245e26db2e9a6959d9808080a0ef2893fb63cf9301fe685a9d2c9ee92f3ed07806d6a5286c643439a201ef287e80808080808080808080',
            '0xf85180808080808080a0392cec1ebc7fbab8fe6ae7affd2409f6f5db5c336e88433c6ab644cb2c33c28780808080a0fd69f435a31978acf643914375255b1ac6d0752f2a05223c41b29ed3e54a76ba80808080',
            '0xf7a020c1c0d14cfab27cd884277223d696cedbe43638fca4a6f39313b0e22fbc84ce9594b4e2a27ed497e2d1ad0c8fb3a47803c934457c58',
        ],
        accountProof: [
            '0xf90211a0e94d66f87b1608ce62d438e0590a22eaacc24f263f012d93f3624ddc0691b36da0512c067a22e751592a89ad4b3c88c09821d12a9e2677f5d91322029308890edba0ebd4dd397f7ed35e8a8e27784c16ef050f2189e091f443190b91a235ab759a19a029db531708eabb7964bceb78db8a34bbe47002232099456ab5d825f4891c2106a0beaad48cf649165c8e6d762f6907c812f5730fe039401a2f71fe3ef8e04d8a5da050f64f11076e7fdfd35334c2ad88a2c7b5b3808351f5165e87cc10208870eec3a04595ff84d9e051098aebb790602b00ef8948c59cff31c051223518751cd64ad8a0ca3618f49c3f1cba3078eda631d83dc3ca73b72aed45cd0383d295ab142f5a49a0973a95ff6e1e6eb0a2bbf4e93f35340e726c272d90153a4d13daeb3e8eb1348ca047b50cd36ebfbb60cf92aee5c6b9e02ee205acd99ef04c5ff6bfaa5744928213a06a38be4e714613ca3852ddc47675897fe5b38162879b2a8ade29334eda0fc01fa04820d668bc6dd40cafeea7d21461f036756d92613038f47a583acb519974bb24a0d5c11e4a2ceeb1c5296bb72bad19c73d11bf33477adcae79549d1a9a2b888fc3a0f6d185aa94cc7390f6751237a5cb1252443d5d4148b0ed8ed1db6e870c67bd8da0ac512a3f773941c05585821c8c998bb7e18a8c5a48be543141113be964fb31e9a0b907a89ba95b58860b8cb3b6c3ec0ba0c72c04b4116ffeae4a7566b4aca8950d80',
            '0xf90211a03053c3d9f04f86c589edd1582b1b567c0ae47f6f42e4e48cd0ab9ef9a253a855a01e429f0acb8c3ad8dc0fc7449216bb9bab04f6921764873e7b89f38dc6632032a09b72cad7ed2019d3484245e78ac39e65fc24f65a4104669ed145c1b3ac28aadda09b57adb06b303d57253d090e3bb2f1bd96f1fa2dfc4d32aab5eb0e42c6a2b472a0ae59faf04d9e356d53238f612389ce903e6cdb5d4284c9a40c77d8a546fd6d00a01942307e1c8154e0a5478655b63a84a04e5bb8fe3aa01892f0e3773d9ae127a4a01010f076d33a4b659cc11a76584850d997496942b3575a93b70998fa3a235a81a0bdb237922292448cf234aed8351a107b90f96f012e07654d420b5b6e4aa604d8a06d4975f8f01661d0ccb34a52c0843009068bd0119bdf17b7a12b52c61f1392c4a0e79af03a498c893ad1f69f022ef2ef4f09ca122d1b2e5f4b78bd8b839b64de70a0bd246831834f286a98be9a2ef84b04cdfdb052d9cfd276fbad7d75cf9f624ae6a0dd71c70c213f7057acba34e0b08a833630fb16f425add34e01a0781eadf7600da070cc65bc1f3957521a4308b2cf3179036038762e2493ea38691c4b07dd5e7c8da09246573bffe761537e1860836b99856c18735f90a18b9ac237ef499327392788a0faf68608251df0a03cfde851ebfe8bbf59f70ad35d0acaf2325715aeabddf3d3a092e64cd21bf8a861b8e3def700c6068ca83bf5ce1bd96222200fa1809c3aad1580',
            '0xf89180808080a0b2f86bc6f0e82948139d9ab24bde082762deb21ed22b2956c01d502f12278228808080808080a0f54e905670510717c2e289aaee20568397f2f3d431efdd7ed0f7c11d32c8d19fa0111451bece96e83f90b08d54f5f38146f29f844f4dac0e903333413162d4078380a02c758c167a8c9cb1ac1e22592852b433abd841c2678383d2eefc862382b8d3988080',
            '0xf85180808080a00ab6b5a3571e4c5b126a52c5681e7f8617273bc88034b76c59b04e781c2b8a03808080a0203e1051778449091f56c134a38e94bbcc136de6def0b4526ac9cd6f5518b0578080808080808080',
            '0xf8689f20f73737f3c475dc111c04b5962d68123219f4c80bf859cc139a4caf94287bb846f8440180a08c21aff43b09c8dc3787e33594d0a183a33572cf68b057e6e1942b6aba31ab60a072ae6be9ad1195d833a50f76a1d2fe19c2d559449d1ed8abc754757c9f9e75dc',
        ],
        inboxContractData: [
            '0x01', // nonce
            '0x', // balance
            '0x8c21aff43b09c8dc3787e33594d0a183a33572cf68b057e6e1942b6aba31ab60', // storageHash
            '0x72ae6be9ad1195d833a50f76a1d2fe19c2d559449d1ed8abc754757c9f9e75dc', // codeHash
        ],
        endBatchBlock: '0xaadc0', // 699840
        // endBatchBlockNumber: '699840',
        endBatchBlockStateRoot: '0x1d1c3367a68dfd1e730f2e728a2bc7d95bc1f6881d1051751e2536370736ee39',
        // rlpEncodedBlockData:
        //   '0xf90244a095ddb8d285b9bd821c252bd76af6d8a64abf16886062ac038fa55be2ebd69226a01dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347944200000000000000000000000000000000000011a066cddd76f9f8f6f808fccd9d484461a5650b4bc24a9295107fda5937c40fb603a0e62e83f32d6f125ff67d7ba42b63793d22ab8f66a3449fe208f49346aac036fca0e66a0ed55b4164d21792a1e72cd69c5034c342dda3cd8291460257fcc34d398ab901000410550004500300000000100404822088140404100020001a202280004200008148801102404008a8160001040000000010960a020480040400222001262008480030100a040020004120080010008418252000000408200600000014001020884000009a0928011020282150000880084000000202808900002090008100010484421428080040002003240040045908000a002004004400001008116001008300121040000a2600d20301424422010122030010e0008004a3220800404204610428020020002040090000409900600600c2808a1800001000015401037000103000000004000082402010498000080c09208040d4200010115950202110008083cc72058402aea540840103340f8466ac42ea80a0dba0d32a82245357c7d1290dca20cc2c7174d92ac57db13100b7fcc6a8e8534d88000000000000000083e32374a056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b4218080a01299a962bcf8d78b8be8d7a6e222cd281dc00f15e9cf849ef44693d7c1ed71ee',
        // recipient: actors.recipient,
        // targetTokens: [networks.baseSepolia.usdcAddress],
        // targetAmounts: intent.targetAmounts,
        // rewardTokens: [networks.ecoTestnet.usdcAddress],
        // rewardAmounts: intent.rewardAmounts,
        // duration: intent.duration,
        // expiryTime: 1722568357,
        // nonce: '0xde1584aa01b9f509801abbfe548f9f058cd130a3327c954ea86c28862f406e02',
        // callData:
        //   '0xa9059cbb000000000000000000000000c0bc9ba69acd4806c4c48dd6fdfc1677212503e900000000000000000000000000000000000000000000000000000000000003e8',
        // intentCreationTransaction:
        //   '0x59bcb1186ffbe99bdbd19633e0c8b21ad88a846b3eb42efc746c5cfe4075336f',
        // intentHash:
        //   '0x9fcc6825d5739ef8c19f9ae1f891dc7e38e8433b9356aa940180a482c83774d0',
        // intentFulfillTransaction:
        //   '0x5e2966449300edbfc9624a299775f5f5b4c9f090302f86f006cdf25541e1c64a',
        // storageSlot:
        //   '0x6b0e2cc9e560d24849163fb156a2e3ce7401561e58af3e818f3310563f7a39d1',
        // storageProof: [
        //   '0xf871a05f9c6bb6d8dac268bdc8670dd5b7fc2e8363796dfbc1e815d991b302e10f2a4f80a00bacadab995410b2b2b5d439313200f32d31c1bda0cb91245e26db2e9a6959d9808080a0ca7b42fddc49e95461129d80499b9ffaf475fed7ffe48f24514445ab8431800280808080808080808080',
        //   '0xf7a03fa068701e060c4458aed37ccfbc2f11383f20af4970287052a59f0b7e1a8c1d9594b4e2a27ed497e2d1ad0c8fb3a47803c934457c58',
        // ],
        // inboxContractData: [
        //   '0x01', // nonce
        //   '0x', // balance
        //   '0x4f224920f93782c9a6956f2e62f63098ea34fbbdff3679ed0665b3341b2fa92c', // storageHash
        //   '0x72ae6be9ad1195d833a50f76a1d2fe19c2d559449d1ed8abc754757c9f9e75dc', // codeHash
        // ],
        // accountProof: [
        //   '0xf90211a03b36b19e4e7f70e07935b315fea4969088b18a3fbd9a06678c9fc9c10f8123eaa06dbeafb5eb2cd654e09fc2ea8fd37c8aa7712df25d5eb691ea9752ee1e5fb6dfa0c3d6ae4e7dae0df97d71cb9a13191c07b18a10054696a306d80d4982d6c683cfa053898ba18743924ba9a396039ff77272f1ccc40c7cbf844448bea0688710026ca0726fd5645ec07a78d18a0c059662605b3e135a1253ae94d6cf9f3c3c654d5771a06a78e639d7f52b7888f541f0c1ce5dffdb9ba4cc687afbb8a44d25fc796f2d8ca01042a0edb3c58bd9f53735b1abee3681b0c81a698e819ee22381288eb6fa9b4ba00b5c8d003354268c1b59b76856e3d0dcddc1be3907562ae289c46fa7f2b79218a0573b6ee348a42c8490e3c06e1c642b73fec8c47432814fc6c1691c7e5bfbd0eca0826d44f1da25d9765562426dc0097747dd12ca5073cce4befb182f1b7c7a3825a0c843a4010c4877ea034156e989094635e6b46d668ac68f9829c0a1f0ba892403a0e6e699aff97558e4e8369f53cb04ae5b7ddb4574767c0021f6fcdcfb64174834a0b6193d549d43526a0adf858c12d75cfb8f9617572a09d9bb986bca67c428f671a0d43fc54794b663ac523e1ad600df68525ebafefe198bcfced0dfdcb7b08b00e2a010b1e7c54ff5386c974fe87b94ae24416e99a3f282bf8ec704eb5a8c8ec4cabda01b85c66231bbf6d3d0e628d2f23a1aa0e891c73425bdf03e7923d6b616cc788c80',
        //   '0xf90211a0da1154082f0741d064b40d92cd594e1ea8d37eeee9299e8c5a1fcad32cdb21eca05175de793eff3e572c1f3a224ecb2690c34b8a9a5c56f678e2a8addd100539f5a00684610a74359031c4fd37e840bdcbba137c8215d7ccfb545d0cc8c77230037aa06f8b6369af5220cea7244b9a988c3e8c50b1525462c1b22e34480b6a59235ba2a0c9bf404e37e60437d207a8d0a7c075af889e869f8154c6cfb4ca669aa0efe63fa00c20d2c9c4f4613eb1a55c6c461316f9e8d23b0467d900339cac6dc76de703eea016d1844f3930ccd0bc0773a9703f3c8525085cb2e98bc3a3024c322a09baf76da0b93827273ea1b00cfc84c4e0d4f2dd6fb8d153862b593c3241470aa3669c79a5a0b7033e9fbe767fb6b295d49cd87fd630e4e0dc9b191557463fc3b21f182b7c32a089ec968c2873f9b0021d98f0bb944ca76535d7e4bbfef4a20026d77adcf75416a0cd2d0edfa2b521a82c6d26f149c188a06d6efe76b0b78b5bceecc09ea18f7caba0022512dd39d8dbf78bedaba706d8f0db50884ac4ad434386b57ba37b38411e70a0bf1d09f43f594d629bf6a1f3b906dbac20bde6de70c8c4bf1d4e650dbc080acba0837e71bc53306e3a1ab34948d6cf78be2cbea61e3dccac48f8880b34a15b2dc1a0483a45d94c3f8dcddd96608605e02f482cd5245440a81bd2853581972d595253a0c2fbc34421f91fdc1e07366a5790b83bb59bd6b69415618220465f001b6c797380',
        //   '0xf90211a0648a21d8f5a4e6dc92da4defc275278141316d1afb328d4b9dd2ae69ce5f235ea07838fdff99f49e688dbeda1927b3985a518cda4bbe62a7b8ad0e09ddc6b85a3ba06262ea3babe90aacd0b85c33fa3de47ddf2ffd25fdfe9e49c1f04eadfdb666e5a0922d8cb7e8d8d7a4db259af7bec97bc950481fe12ae36770c2830f2c83a1e4eea080c5576e39c07dd031274fc70f9259fc52b28693b752df4655919885856dc783a05f7956e211d2dee47e100e41120c0b226011779819b017aa11f538e72b0bff16a0da475d39ab0bd9415b83d74a1ab44fc48ae992c09ba077fbd5629081d97a999aa0c574606334aa7f3cdab471a052194fc479fa6e6a329d4244d3f069bd5e9af8fea0b402b1272cafc5ff2de3bb26f407297312d242dcdff453571557d339f3c3c9a4a0c418e02866c7740843836137a57a11a67db02f39af51a18872df606c1befc342a0f417a0a8826b7311ab7a1105bc3c9f8e6529729840711723efd6c486cda885b6a003f2f59a12e6e035bf68d7a4ca8edfaecc6f56e97215a8c3c5c504063a3bc419a098eb5da74050c8fc0096fd4ce6017c6485deaaa3f3c05cd79f406ba12a7e1a8aa0eff0f7ded241c898751ad2d1a2f36f16ef1ff0779900614ca9e07d41bbe05b54a067bb02fb6f376485cef6b6358d22418b8ce852b3021440d0ae0b0092468cc961a0a28b1cbe1476a27a9d439abe545b95b3b95fc817d751bef14db3e21116f2b3eb80',
        //   '0xf90211a0bc632bbc734ba6b59c44001214cc9e31c85c6470d77462e91db875dd1966db1ca0916c02d04afb5b8e57eadd9432db367e4a34840d062c88c4f1c97671ee498df1a0803103fd746e23ad0454d02516b8eeba2a2988f6dd95f1794dab4bc1a167b0aba09e4b6b3e585bb355393aa785c95364ada724027658f2fe8261c3b50305c86b1ea0c4d546800353706df53d8d6c832a1a10f145ffd8d35c61aded7855b827f95bcba07a2f78957edb670e7e5de3b367a0d15f7dc8950aeecdbb892b44123d154c64eba0e0ea4e964b7edf4782e62b0b576efb52af645af848e08abed10e7d202bfb232ba0f4631565754b877eb582f7f72e5184db1d8eb192dfc0b476314fe5e4b30e4723a01e96ea10cc73121a5067873d7f5961b82cd05b7420a6274703b29ea00c516487a00ffb9b48af74ee380f5c03d5e70e09ea09ac9ec2893b07e45a38a3bdb4fc4b14a0978b3a4754c9cbc1dac020522ab2ecccb02a8c0b17dd38c12f96842b0b08d12da01791be417ad570b6f838016d816409607ee3a8a0d6814aa3af6534144e4f4fcea074b37c1631a97908e1f397f23d8ddee68bba4e5b75e07485065a76946005d3d0a04392693796fab8f5e673a607a0a3abc66842e4c94199e3cc7703ce7c6dca9c9da09cf89060f766834e1f746af8213b2f6b19f7e253c5128c3f842752c6e5af1f4ba02e54a62028c914d509336a8e84cd122944f349b5588e08170f2ab68a2392f2ca80',
        //   '0xf90211a06d14b92c6253f170ff88e96c5710b35c1b558f9c3027d8986a8291f0cd9d6b4ca05f40e17cf8367203206d44a1977afcf1cc753e69042e7d13f242e6e4edca205da0ff34954ec4ed8c7634eecffe95421679d4f8a0a2809b136c7b112e34d0281014a0e099cece66b77a70cc50f1052ac77762807cfdbeaf2510d0dc103e971d7b7526a07307d70016eb9b167912694d193a3708b6ddd83662b769fc5217e4ea79a632f9a0e620d7ece669d716f89efdfc0028319b6a0eaf4a97970f945720227f54552d32a01df8d6cff4d5c35612d1d02f097d42de2126499609c740e0c1119bfc0dbdcf7fa0db39f353ad7c174c97895e46a626d3965a57c1d80e39973f0d1d2bb723850575a0485e711135df6973e7ba64958718a5a3b826e9d87135039d8523c0405ef4126fa0c4f4ca19453e1a9368a263754cd3c1076855c621a07d518ea1d13aaf46665849a0967a148920b1e41f92cdede99ba17b38b0adfcd2456476f4bdf7d1a0f665cd14a0e0b405c9ff5500e20f86a99f660d8cffde4d16dd84b639eb2243da96bc26a041a0477cad28c4bf58b48f8576660d21404c339fe84a35806426f6ff729f094474e1a00ce23b4047e7c99e591224a7104d63385398d02f0f5243c613075dcbd49cd594a0089b66f4e13a769c9be4ac9e61c91aad4574b533933c4bb4de614a06f259c38aa05d34a6a7f87bc325a5885f5ce6d5932b55ff4f5c11e91d6d7311d65c33b3deb180',
        //   '0xf8d1808080a08e8227e110f9ea45cb4b4ab169d754efcfcba523dbfcd7123ef6ccee7d47599a808080a08ce61142b051a9358a6f30b07a94f3be51fc1d4ebee3fd09190b7ac202b546f5808080a00a7cb99b6dda92f680a2cec026306d4252ca6be77ceb34d2326ae10d849bac1180a0cbe57d0f39869fd5ce2ccad723d3ee7c82d6e8c6748cf58ae7bbd8b192d3c3bba046902708980ceca7830e282f2856344e33040c6ed238bd5a5f44d0c39fdfe68fa053b5f10d4c5d3d80963f09d0d45960f0f62e604ffdb99faeb5911069ce352e4280',
        //   '0xf8679e20b048d78670e1d3f8422e017953345c89a0cd0164ed149eaec42f96c4d9b846f8440180a04f224920f93782c9a6956f2e62f63098ea34fbbdff3679ed0665b3341b2fa92ca072ae6be9ad1195d833a50f76a1d2fe19c2d559449d1ed8abc754757c9f9e75dc',
        // ],
    },
};
exports.bedrock = bedrock;
// Eco Testnet to Base
const cannon = {
    settlementChain: {
        blockTag: '0x628774', // 6457204
        blockHash: '0xd08354f5a25da6930f0bd9da19751123b52babdf663401be4bb9975d86e66c52',
        rlpEncodedBlockData: '0xf9024ca024fdab409b27a5aa52547f0db68b485d309f1ae9bde1d2a8df71c2685a95834aa01dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d4934794e276bc378a527a8792b353cdca5b5e53263dfb9ea00793c92b71543fa6ec37eace8d6b8d2c1ce63c68e4ca8a1aafce95f55a2afbc1a0e4133d59c4c8e96f9d09530b514a2998e73fb3a947312970c4636ae220940efea097c411914b123325de5b9dd6b23cd4271c54ec2dd95e3dd87a630d6090a7d1adb90100c4a00002811152acc1c04540509008f40c41acc85509845002ac012854e3808c041b3422084e233230e205c11404312085308819cb2046469084bf04c422581890226260903e120ad02a04098440a80000415a811a220000580a28338121200e233281106f2184528651075812d8ae0b4c000190ad45cc74915a3290902420440283110161505224302030587f013ba7804050218a1aa4443c30bca1f5a04220234ca096a4a04814495601228820885a03c0888a5e45012084056222125202000008901350120c4ad40328068942a0010400020a9108420000011ae00e80e0047d10e4164914246644001a43482a85a90408124051b21040000d004440bce22280836287748401c9c3808401c759d18466b4027080a001682fb809a8992f78aecafb7c39aae7ef3b93cb580841765d671533b7d6e9ac8800000000000000008405c64c4ca03d4d9f13c11a24903b1069c515a45985b1d52c707f09cc7774d9586c7eda66a6830200008405800000a0db91bb3bc5c76243dc1bf8f08a9eb00fcc0a5a2b249997d1ac6f79a4c58f1f71',
        worldStateRoot: '0x0793c92b71543fa6ec37eace8d6b8d2c1ce63c68e4ca8a1aafce95f55a2afbc1',
    },
    // Destination Chain is BaseSepolia (not EcoTestnet)
    destinationChain: {
        endBatchBlock: '0xcc7205', // 13398533
        endBatchBlockHash: '0x77c9ad4c153d40d71ad30e0db356645bb885e5e4fec575fdf65b479b57f95adf',
        messagePasserStateRoot: '0xb5a62a25cf193ab1dba3ab2f1308d78ca6fe7c9647beca5baa4708343ecbe245',
        endBatchBlockStateRoot: '0x66cddd76f9f8f6f808fccd9d484461a5650b4bc24a9295107fda5937c40fb603',
        disputeGameFactory: {
            address: '0xd6E6dBf4F7EA0ac412fD8b65ED297e64BB7a06E1',
            faultDisputeGame: {
                creationTx: '0x25f0965510cd29f9d7cac6637bc694b71e7da369d7a5b264f4d648d584cc822b',
                listSlotNumber: 104,
                gameType: 0,
                rootClaim: '0x825d2d3c51ea0ebdf25199ebb3e9d5835b6d61c407ef388ae4cde1f592306c95',
                extraData: '0x0000000000000000000000000000000000000000000000000000000000cc7205',
                gameIndex: 232,
                // Hash uuid = getGameUUID(_gameType, _rootClaim, _extraData);
                // uuid_ = Hash.wrap(keccak256(abi.encode(_gameType, _rootClaim, _extraData)));
                // wrap https://docs.soliditylang.org/en/latest/types.html#user-defined-value-types
                // Hash https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/dispute/lib/LibUDT.sol#L174-L189
                gameUUId: '0x66ce5b8e8b9be86113976389cf5749af7db7e380cbcfd6edae9713b1d1ae2621',
                // GameId id = LibGameId.pack(_gameType, Timestamp.wrap(uint64(block.timestamp)), address(proxy_));
                // LibGameId is here https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/dispute/lib/LibUDT.sol#L82C1-L118C2
                gameId: '0x000000000000000066ac4364e6585806c6864d6a3285cc72961eb1ed7e078e2e',
                // '0x66997f68e611c3b8ec600691b9d16e54b433e03742e3b9d8',
                gameIdRLPEncoded: '0x9866ac4364e6585806c6864d6a3285cc72961eb1ed7e078e2e',
                // '0xdc1a0dba53f837978d5bafb52ebb7cd67f5cfb418c5ec060ebdc4bca53327769',
                gameIDStorageSlot: '0xa2153420d844928b4421650203c77babc8b33d7f2e7b450e2966db0c2209783b',
            },
            contractData: [
                '0x0177', // nonce
                '0x', // balance
                '0xf8f08690d07bf01927230d32b6e4b72f5495e885604a5098f17c3a3b7dd7e72c', // storageHash
                '0xfa8c9db6c6cab7108dea276f4cd09d575674eb0852c0fa3187e59e98ef977998', // codeHash
            ],
            stateRoot: '0xf8f08690d07bf01927230d32b6e4b72f5495e885604a5098f17c3a3b7dd7e72c',
            codeHash: '0xfa8c9db6c6cab7108dea276f4cd09d575674eb0852c0fa3187e59e98ef977998',
            storageProof: [
                '0xf90211a0ad92f818c08b81ea72f8f7b93d0a9f9151045c0b2c45f03626b1b2cbd42cf056a05215eb5c086130fa951d846a42e9a0a8db5460561f57b13a568d9af53be7d1e2a01e4177521d44a095446a0b63bff435efdd12248e05fa809bb0d5ea6edd927017a02e087f4ef39d79505e1ad69c23b5a1ff2ec10769f4d9fd4199844449046a229da00b199b3d9444982aa0b11c7b3e9b3fed3233cfda83accc1d96ef6120e8fa5e5ca0d33de9b9603df110b6b9d6e03c9fbd6361bddecbe5162c04783fe05e527832eaa0f66a054dad95bf032a75db1df508c5947f1bf796b0c405c96eef3e46baa56888a09c03cb6785dd22b03fe9742da159f79a6428b395b1dcdf65536cffcb920bcee4a042c4f18357ce45f15dac5e2e3b4c1f7b0dc9e810b9d332b493fc8cef7acf1571a01cb92c50dc5b16b937e32a4dd60533c614d7aaa42112ce546d07f528e7faa2fca0330fd49bccb18d019516b3ab6ce74ba1d9e8f2ee282192eae9423f814c0ace5ea01cc1ed1a312436b216e37a73145b7f4fe9b3b5f4ae5d16687a1806aeefcbeb2aa0442f6d4a822d55a503ff545fdc012333184d7b5faa9c3bfc92d718a82bcd8355a05907031d6830b06204fe67b9462e3fcf5b6ee8e3ac8cfc13579dc91d928d1586a08d89d8822ea637144b5ac71da9dc538992ff31eb6094aed2b21ba6063a4433e5a0f0e9850de25c8794abbc248fadecb7e67d4e68e78d887c162318a1863901a69880',
                '0xf90211a016af422bc7d08844844e1bd3f70eb4c891a1691a52551e4787496700c798a632a04c6b0c4ebe6376fc1f3f7bd92bc3348f8e73669b8e08e039b96e26b1ea5c8eaaa02bd56554c25197fd55cb558c7f5d59ea0214520252bb8e2117263fa611578ebba0dee11576396adb445fc969483c964dda550234316f5cb28fedfb2b493271139da06ce233a4629448030e3d1626a7e6da1289f02e8126a3a61b41bff5221ad4a0a5a027e4ca11f8319963df80e6bc6f349de139d4cbb2fa08e48a4d80544356340c92a0379d61e7c971189ef134cdb94f8542fe6b93cd497d43a8d5f191de37f1d8822aa0f38236a5d428ed3ce2021111e537531cb38bb930b6f74bb0468506b462ef288aa035df77282a44585b06bd22db29b92411567932026dd78e3df99aa7eb233396ffa027ae00ddaf469bb8af133c25ba819ad99f63ceea03c7bc8875ed7fbaf9fa92e3a04bcfd6597c3fcf39f31c2308d49ffa50165557d455b41bd2624e4aaf703a35efa098985a41f0270ac1eb848d1f6fdfeaee0285d675b8765720c543a3fe62904988a07a8c66e189222302ca775517c2025a4ff424eeeda4fea154146458749722732da029d4901f85cbafaf9da496612bd46c42ea0c9041c19805cf26397fc18b3991f2a0d1ba748b0490eca319432df5895b61db3497e54e37a5809d348d50213e61fdeda03968c61a8986f43d15a141b509de8e04ec73d9962c7a8f75e3bf8bf0cf445e3d80',
                '0xf89180a014c3c31899b30f71a3109312db741f715c2783368fa4c3c62c6c3ee70d8359c7808080a05ac399487870851683cee3698ed08749baf909d733ec2181afd5e54693f4508e8080a045693c530dce67456e2881d7fb63c9a14b3d4e16d74cae63e555d1f7bc9b6a098080a0485717ffefa53d1e78ddc419bf2c6564d0e85a573ac66f4aa37bf289136b61a48080808080',
                '0xf83a9f3f2c6d1a3951f2f2bb133ee91885e61b076d25bdbb6fe17c27dfe4cf486934999866ac4364e6585806c6864d6a3285cc72961eb1ed7e078e2e',
            ],
            accountProof: [
                '0xf90211a074a993ba4432fb50c809658802f772b07752518d68eccd622bfa0bcb516281c6a0d2e810ebb57e6dbe39d46e303ef8f43510e09d7aa21207fb20c49de947c1b04aa022dd7e9293183168b27e88aabbe172162ac6960376da66b6fc22d94eb01ee4fea02b2f96d652a0bed375b6693446a9cfa105576b90f264d3820ff2889637daeb13a03a4c796550fca23d088ef0dc4dadc1003567f6fbdaef4858383b5d0950b6ad64a0b64adfdea7ea67036c3a159b87359f915ff4286082914609a00396a642513278a0504ccc713cf2b0bb189c5133514f7d8b2d6efe67e909200f0354efdbf55dff0ba09b2cf6cfce0fc19980ee83df462af41386cb250106b2333ec05d869d30b72060a031dbf7caeb9b88a15960e34a6fcded56e6a92c4d3158cb4cfe7e42ffb1307ca1a09b9df47cfab9e13efab9ca29551d2cdb5cab669a3ff2773bf62f9f326146b5f6a0f2144a762d4d0b7552b6336bd6af8b10ef17fd147d651b0c24b8da11c5703894a0cc46f77d717a7b767de2d0733df970878327e3fbb431e9bfb4e56c6096389a77a0eecab6d9d621d7b22c5460451eb0ae63232d3ef760ccd22dc8b2026495e6fcb6a0b6b499f03f835c85b047ab666739505c2fc25dc693cb660fc17367c1d1b08387a0d0b967e0ddd0d7054507d6c6e168868db7be082c02d92ed4f2eed3469e5068e0a0be4c426c3da887549a921e0b55550b82db26d124ef2dd4ac84531881bc87399f80',
                '0xf90211a0b5d1a1fa0529771f1427ab27a388f38a0d018970cfb5c84ba9a182b74f40a2dea04a9e836c13d978cdd0c606e8851a11b15403cfa30284e32d87f0a56bc2351286a029e39be3c6ff9a6a62d847d40ba8f42564aaefb5e4b01ddbf4ad544bd01a0b2aa067b132160c2e4b6508899a5c7703f2bfaedc91906c4cb77c5356885e3c67447ca09c28a3d199820797c64cf89dc29c6e9c812c197b2ab275bc258e4880e369f829a0e00d475b0b6b09c26924f3df2ced37f6338cc2ac599de2c3a194e36521758b1ca0e70f83a5b3602de8e4e0011d06c389c347e1f71cd44ffbf1ae2fe679f1f64924a0c77f448d5eb2d5211dfc8fc56bbde7c91e6afc10bbae7803efb6202ae4575da3a01773c35e2c858d1437d3af953e2ff937abdcc46727a75aa27c9e47f98226a2b2a04a5b7d725e72242fb3ccebb6fa92b9d45ff93d6e7c444b1a421cf31990efe403a0325505bc5d74968b651db1424e52044322ffaa9e5f5973df59b3d5474cf691fba098d55bbcd8c3b4ff55ad2ff5e60b6f27c709cec4c69207bd6b13361bfb4b2b71a0ba171db72d0f863ce63d59e9d571585e29c4ebb8688726bca27ef466046b49d0a0508bd6b869e3380165f3f52159e351cc203b91e16791926f74835edf04b4eaa1a02234594ea50e41aede44094efb2233c530b1cededf0821e12f800af2c93d5dd7a0784180bcea56023431809fd71c5468dd105c1f102d635b797eafbd55bf56d09880',
                '0xf90211a0f4156618b68f831758c3028c3ea67a3660d4c6a1928b356af7d8027cd433975da06757377bc707bbe1581694cc5b9cb3e3b27f8aa0bdca321c7efc819d27706d21a008adec1b771fca71776ec5ee5dd8cb6c1d2642dbb5c1d090ca5d752cf42e682fa07d10b91710114f4ffc50d060fa32b5e17ab085f36dc1fbddee90553b80250e71a0b02fe512103f27891e9e87468ce5c8510709ca8fd3a1a221a88064c94437f43ba0e8cba3f03342228b6da26a259d55526460a962d8074b45a003cb19933ec33efba0b2ddb3aa5a677986ae36cedfea110a117c98f76e8abdce6667d6dcd1c19184a9a0d030e9cce4dc0c452dcee69f24ea6e14d1d1a662dc517f942586bcfaa36cf0c2a063375b5865d506ff4b52766a5e1f60ed26105cdfd854799bbf0c12ea02793023a0f4c062f236af3caeda7688051229d09222fc555bb348c6e0a9fe76dd35c17826a0793ec4efa33f2b0dcb7569e274767d598aa1db13c4eeb5ceacfb42d4be843214a0d81dfea8474e1bda51868948ebc9de8a66a0e2cc700c7afb498e7b21c611b9b5a043fea3c508e65185874987ea573ddd85869d1cb5bf95a864a907dc677aa15425a00dcf68c8f264bfe28defd618aa4c19c867918312fb541d2f8d874cb5ff8d4344a0f502ef167c79b0e34ccd7ac16771650bee45a65381da370d7827dcc997f04c2fa0548f7a0e291c2bf352531f3d1b626cf8ebaa6cbe8ffcfbe2c6876fce0caa57a780',
                '0xf90211a09612e702ce4ebefa777bf3bc3fcc9bc4c08edcbbf79401c4a504f01e702feb17a091ebbc3dff8b92e13da2c62033641d746d95cf006fc62b533032b59f41f2efafa0bee4262cd194041834cce1826a22bc35856c3cf06c926315500b4ad025661577a0aa90f51c1040d8963f77926bc8242aa4e07345e095f08b9da2ae5ce396d2267da0c376b5766b19bf27f85ccde70ac144de83cddaa081290c6283d7e5512960028aa074d43e69d7b18b07e44248a723d21cce0d8ff37e39e611d336547e74ec049953a02f27e81f7f4b59f17b1c9c50e79916912bd12e56a010a7bbaf54e9a9d173a1bca02ed4f2d71e3d843b78fd9f77834e1c824b532d28f740df7e3ace59e63a6e7ab4a019a835f62b7e5941b59aec47833fbfb3c8016af63eb81c83cb20ec6a9c0e247aa0b6e6968c2e738495d8b52b3a8c8d18f564507ef12490bada18af425514ff882ba0021b7d498e8637e058b5dc60ceef084229048b2f1303aabc511db8c913d86175a0db932d6105828599341fef3a4a699a323ae1829f9b41adc42ae9dbd8df36212ba037cfc4eccc8db96a5c95717aff9d0ca7ef81893287840ed30d28a61b7a408baaa04cb97e4207d0b19bc4e65a6ec7465d7a69e40848931debae522d97ea21e75866a01d00ecd9451583f0f02b033d9dc67919cb1fbc9109ca67216a1e5e44b1575d90a098bf812e22794e03ceecf675170031a0c513c5a7313ffb27fd85358c65f8f70a80',
                '0xf90211a08fed67abf7004bb19dfa5805e32c44c5f60cc72d3ab9ca50cfff6ac6cc5f5266a0f0968d31dabdbc12a35fd7079a002122cb2495d45adca2181813f24c9afc8a11a065743ebe9d2ae18cd64f194452a186dc71acb6ba4e1b79e0c76e5e0c4a8ceecba050571e198af1fef59be18c04a07a0ef81d6851b9989adb96626ac91bc1514262a04fc9fc90c18deb107c768f645a6a51366a0bd158ff62e27c744c0b63c86dd307a07586e471c234bc5eec5d46a4a1ef781d04b0e13593c601fb57b35b8edfc579fba0397dde4e6c39f71fc973112f11f9132e00c46be74e926f1f16069606bcb8b888a07fb221c31f72220c2b1b65f0377cdf68d94545a8076bd93ff584f1159580fc88a04bf15646c6b797665f573362c76d476b854f63d8b834a430aaa64b7919d2a967a0302a7aab8ad691dfa1e0be2a73e64e697d2eb8b06740811e6ce4a495cf8334bca0f665dead6eb364689db923c0abe74c34fe3f53f5dcb58160500af336fcd18342a0dc0018711ed14c1d0cc43731721042ce7d93e6a127de0a01aff9a24e53ce370da07c5ee96db37e1db6178830a106c0587482d804730da0fc809cbe0f5d7ccb6450a0d3d62d6ae670378492ff3c188a7fd17ed5cd068f76ce28b87840e0b8ea70b751a018734d8fa3974f04b47f658b2d41f3959a2fca687eef3c402554465fe643a2ffa0f77dae7d02e995534162220a72dcd65bdd1063d3bb672a7ff7775ded4d812b5f80',
                '0xf901d1a02de11b015ea1ec6800dcf370c5e75ff846c8d3bc39628752f4de1f8428fdf9fc80a0bc09451657faee6fa3930f90ea7409943768b754e169d1af449e544573b27649a0f1f3cddff30069381d1b8aa0121bee76f9f139f01a04067dc55e440de87ebe2ca09c072cecc33dcc305986fc5c758b0e313de2beda2a4ac0ad181d7d6cfad73bfba0245c9b64bd6ae1e31e0e1d21496e3543a6043ffa1ec5244360428338b9cc11faa035fa4e7ece7810458d734e3c274b05fdc6544f72c345bbcaf1a90399bdfa241780a00ebd3783b6dd2a1ffdfe7206df6a703ae88d44a8a715baf77232f06e7e9b298ca077fb4c957c38b7a9f5ca8f0afa86e7220beda09d6d2a17594e13d95bfcb69fbba0edfbf72829e8462f0194c2c01b51511c0c72281959a1a5fb3034665769dfeac9a03a815f4886492585d44663ed11a5fe36b46c1e64430b04724994763d91015277a03814cec59de0221ec034b7098384c012b609c601afb4c9798786f06765271b93a0e13520173470f93b40fdaba3654c54d8778e0a1079613b9ea44f756d637aba72a0a721b2a81e18714c52049579da47648298186c64ba7406ddfe696359bf9d768ca04941e87d247047e0f545c006ef006f7a8ba601f823abea6073e91eef9bd187fb80',
                '0xf8518080808080808080808080a0343bf8f08e1c15798178e9ddd349ac6764963b760670b71a5d816837f899fddd8080a07bb381fe22d945609be65de314d7971041b9a75b8b5c2767f5345a71d7d232aa8080',
                '0xf85180a0ef2550965f335977489deed8961b4b2e16bc3dd2e31199dc146cca538becee70a0eb524f429e7439862ffe94eebf961970340162273ec743879df7d5f012b6fa3a8080808080808080808080808080',
                '0xf8689d200716a81cccf6697630b988c56807dfb1b0e315b814825d7bde0002ebb848f84682017780a0f8f08690d07bf01927230d32b6e4b72f5495e885604a5098f17c3a3b7dd7e72ca0fa8c9db6c6cab7108dea276f4cd09d575674eb0852c0fa3187e59e98ef977998',
            ],
            storageHash: '0xf8f08690d07bf01927230d32b6e4b72f5495e885604a5098f17c3a3b7dd7e72c',
        },
        faultDisputeGame: {
            address: '0xE6585806C6864D6a3285CC72961eB1Ed7e078E2E',
            stateRoot: '0xd1eed49f58046d229c1ea02111f45d462b113fa579eacb11ab6ae9ed5e809155',
            codeHash: '0xad7a75bebada3a307bd2279100436977806a55aba149b940e60303ff565fca8f',
            contractData: [
                '0x01', // nonce
                '0x', // balance
                '0xd1eed49f58046d229c1ea02111f45d462b113fa579eacb11ab6ae9ed5e809155', // storageHash
                '0xad7a75bebada3a307bd2279100436977806a55aba149b940e60303ff565fca8f', // codeHash
            ],
            accountProof: [
                '0xf90211a074a993ba4432fb50c809658802f772b07752518d68eccd622bfa0bcb516281c6a0d2e810ebb57e6dbe39d46e303ef8f43510e09d7aa21207fb20c49de947c1b04aa022dd7e9293183168b27e88aabbe172162ac6960376da66b6fc22d94eb01ee4fea02b2f96d652a0bed375b6693446a9cfa105576b90f264d3820ff2889637daeb13a03a4c796550fca23d088ef0dc4dadc1003567f6fbdaef4858383b5d0950b6ad64a0b64adfdea7ea67036c3a159b87359f915ff4286082914609a00396a642513278a0504ccc713cf2b0bb189c5133514f7d8b2d6efe67e909200f0354efdbf55dff0ba09b2cf6cfce0fc19980ee83df462af41386cb250106b2333ec05d869d30b72060a031dbf7caeb9b88a15960e34a6fcded56e6a92c4d3158cb4cfe7e42ffb1307ca1a09b9df47cfab9e13efab9ca29551d2cdb5cab669a3ff2773bf62f9f326146b5f6a0f2144a762d4d0b7552b6336bd6af8b10ef17fd147d651b0c24b8da11c5703894a0cc46f77d717a7b767de2d0733df970878327e3fbb431e9bfb4e56c6096389a77a0eecab6d9d621d7b22c5460451eb0ae63232d3ef760ccd22dc8b2026495e6fcb6a0b6b499f03f835c85b047ab666739505c2fc25dc693cb660fc17367c1d1b08387a0d0b967e0ddd0d7054507d6c6e168868db7be082c02d92ed4f2eed3469e5068e0a0be4c426c3da887549a921e0b55550b82db26d124ef2dd4ac84531881bc87399f80',
                '0xf90211a08653b3b4aacb04f6aecccfade9944a202849ae7f793ed65597a0131ab63bbb34a0b838b00f794089b4b7a93dc31999157a7c507fa6d7af8c01cc245823cf499111a06a6b5c7006614a371296aa699385418be57be85d688d1bc717aa3ab51b007b73a0284fdf2593077ebd54aeeac326dac27994cbc3d270c195d960942e703ed34199a025a56c1a688baa22e0a1941f3bbd35797711df2099e2eb8dfa41706e3e2a02fca0ec0713cf456bdc1d34b65449bd2d91e91d5861491c21967b79bcbdedb31a0d74a0d312a2eb2b46d4621a8fe54b8b38b975de9ae3a0a1a5355b335325e8d2dc9b07a084fb406ccea0f087bf2e24a09432c4f9eff8fcc73b775be44c1d25844e08f8baa0aebcfe934f307f7cb5e8c60dfd9d23b24b0681f4c06e0481d2d499eeb127e8eca00a41c5b00b0aec3dea58a6ac0338e331bbae078c6a2745c728bfb5264859b183a02108949885c8f1a29d43f382b7fec395e88094bce9aea1905b0f92ad19023e11a0865861e8a6b550f0e5fca36ab8531e2b0255837798a3df378d09f6a2067712bca0962ed4ec66e95ab4f4dc3d69395da94f399a95e1742c087ec7cd3513b78fd653a02ef73673d0855e859f8502f7674709298647d9022d9d158ea08139d6a5ab6803a05e4f18b4e107d6fd1dca9de752492ecf1804820702b009f34abce4d3dc3bb66aa0e3e485ac0957a9c4e9c17d6b33a4e3c9e7e9d70b29cf16ce708a3f7777ead01980',
                '0xf90211a02e4439e4fdb394faf111f0d8e78c5bd733279d337308b02e0b0c3f4733b6a96da061aac06c69a4446c8ddcd12c82370e5e82f1b808ffaff00c6b523de0f6c93b1da03e514c56d697117dcf97f1b827d7c8c75dbc7e2a02b47e7d550a767de298fecda04787588f9151762e2c4a53a67fb77fec8043d422aca2e7358f1945e5361314b2a092ffd3f8b2383e18259000329213958046352ef1038beb5554275726f75c6be3a0602ccb60b88a37624435c568a94cf78956860a21e022733f3dc63f4a6627176fa0f582b4f58e50398fe4194320d65b12d3b2ba5aef0c7be01acdec2cf72f118644a05d2bfe08d03df59eb702e1a9266ba6419b622a398a91c47eecd696fc92fef88da0960607c4b80d44676a883503348a49518526b684099d748aad7b6eb3c30003b8a03ac73053b6f060757a4b022cc17c19080869bd4b8ad8d886f963d1d60dac67bea0f09c3a20081916d6a3f8811e22540dbe1b5b98c51dcbbdf78fb60ebff7a7e224a0f10dcb9bde3172d4bd416a3217da939733214eb1e51640e4eb2bae9369899f57a0c75d7453f3538660e62b463c17642a4f28c34cd71fa633ecc9e709a4c38f3da0a0feefac0788b9a31b619457168758ec62bfa839cc9c78c9c96fc275a5f47cf293a0e0d9c81e7354ff8c9e205dea9ade702c213095efe1c1ad7e4c9841fa9e8979a1a0e05e2da40682b4746db7cc99e2b06629dcb22b5a892dbb6c92b92de625fd265880',
                '0xf90211a0793e81ece68c84f737fbd66fc1d172bda72e7ad605bbbeb3206643efdf2e41a8a0427172ca62581256a9d7febc65bbb5cd9bf93a3e67b69acb7a40696d657c76a6a0129d7e8aafb02a2e941d1af1c9ecd4b21fabd4f988b0067002e651b9205446c8a01d40f16dd78c4ec3c675110debb738b51788f63021bcb423d31174b8eb1c8fa9a08c6b77d29cf001f4da1a15daa51c0b6dd0af5c4d89833c859d0e4f5023e9d40aa06fe128af53189d8d56dbfeea5ca88a1b8da23e9fbad486552d2428f21fe5a772a081ef2a9013ad923c3176fdb1c1714c8a09e3e95e328635961464f4093d4f0263a0e904cc613070d66b5c28e2b981f6da851d4f3dc9cda99cd74bfe51e630194b74a0b8f17e7569de27401607e3a247c6a12f7f53274bbfcdf9742fd248600edbdeaba021580cac243d2e025ebfe4e9826b00f6af52dadbc20d4dae5ea25774dbeecec5a0a69c9248e20079cfe21cdadaf54a9343f6311a34f3975e6f178fd753a41b91b0a0a6c07bd09b4f889e2fb5e4c332022d4fe01fac9a2af6d5f39b3b120d5622b330a07ed3d212e9ab03f40061dec77d763ec3e71c3d8e67671245ecbd4a4618595688a04d40cce90c42e9b8b343b0ed2634e4be7c5b471e9ae2629cff048d177d18b6a7a097203ab7857010fcce7ddf8de5f010d2ce7107ef8095ba999687d0b05ceec899a0a74bccc066352cd5e350fa0610144274af4564528d76fc672f91d059a2645c2d80',
                '0xf90211a08d8a85b727a9d4c05d7ac52b4f84ac815b6e4badf3d9693e7de47cfa18c5a36da0b3fb3d9e4f96d028a6b0fe5b70804d1a538d9f27d584cc83e2de95adffdc7815a00089e920bfe5b57f3d6f8d9a8c5830584c5249ba5ad075d291654988e9f01d14a0ef5c68a15d82df98a09f6c26ee6dc840f585e3c3f10068d41b5887aeefbb18d9a0e4b5e07491e28a22cfa7df9dfa1d487e3543f0c36e98b1d64687a8f2cc300d17a03d6d5ce19d98fc3dffc5f0da23518e6a7e714fec63e6dcdd3cfdb446125b1e04a0dfc594e7a0b2f98289ab087c184074943bd40ef2ed07d32367142e62f1f43cb5a025ea56f4b5fe80e267b94745b6aaf606d8fc8a9724c442f3cc9e415c40dd436fa0be1e927c0579797400947c0210844b7941c8be052b94869cb63770b5c96512d9a0ba22fc781460962d094e616df7b694f67b4ed960fb386a4cd715cf882a5dbf96a0061e6252978ba45d1b9c1bf22e60f54fab8e6f38f4805d3862047817f1f501fca0c6d89ee227fe5d410a229dc75a0267f4e150f40335615fb549965237f6cae04aa02f94c1b895cbc90a7fcf7d04816a3afc4f9d06e65ce85a31b4d48c224ac631fba068299c5b198ba00660b14045dc7d206442d839dde24be7fa389e5d49866d7c79a0a98198ba15a9d43f27157020aaa7bc9078a39a16a69bcbb782c15e3e9a27a5c0a0e84d9cb606d32d054232f841aa12c950c39c9b93b23d765322b9688b4e4783b480',
                '0xf901b1a09040e30c8d9b5a1349ad41b0a83e0656d789f0ce1405adb6c13956d6e454d32280a088a332fbe067f3ef1e09eeaf8e63102ccbcb8ffc32d42215ec353b6faf84d7d9a003a3ec16824a053f61960e1906604ee64ec540676951ae11911241a37a917848a019b53af68395051d20ed4b088882de2eaef57f8f6d37a04a5e6b4a40980c0dc9a057e4e39b28d4b0db501294ee51c5b8310fcd6d1dbc4b7cb25bd80616a2b10c3aa0748d3cbfb43496a664a4d88fb3f30618d37a262e519ed7f1d090a30b4d942c43a03b60a7af5382822f80a73d9877186abb78804e575d58e456f06661b45646394180a048a3b52ac4f60d4160bc5c405506f211d7e4413e9826071a926aff9b78a9c567a0b84bf1ebe68b11e049c88f0f47cdf3dd2dc70ee5b25edc2681986cffde630a6fa0710d28b62db5ddb12513e40847c815415c526a396608475cc826ae04f7730eb5a00a2a74f30edb95de7465a8b3eeffd3850cd160a7d9a1f5ef03a78b608964884ea08b87be225fa7c283aaae7436aeff310b1ea756ec07c8e38f4f4fcf632f59613d80a07db76191f754dea6b417fbafb3eac2d554ebe53b5f189cc625db1ec6be74079a80',
                '0xf8518080a02b4285bdef7068bb3dd396129662a5a901295db47d8052ac19cf33e4613783de8080a04e20e916050adb13c3d3b6fbd058a3656a831f31dd11b5fed3224d89ec484cd68080808080808080808080',
                '0xf8669d30f80ecc747f77bf1e061966fadb22545ca79f3ca193c54fce7fc06ad5b846f8440180a0d1eed49f58046d229c1ea02111f45d462b113fa579eacb11ab6ae9ed5e809155a0ad7a75bebada3a307bd2279100436977806a55aba149b940e60303ff565fca8f',
            ],
            status: {
                storageData: '0x000000000000000000000000000001020000000066b0e0ec0000000066ac4364',
                storage: {
                    // Note the fields are inserted into the slot data in reverse order
                    createdAt: 1722565476, // uin64 offset 0: value 000000006689aa08
                    resolvedAt: 1722867948, // uint64 offset 8 : value 00000000668e4784
                    gameStatus: 2, // enum GameStatus offset 16: uint8 value 02
                    initialized: 1, // bool offset 17: value 01 (true)
                    l2BlockNumberChallenged: 0, // bool offset 18 value 00 (false)
                    filler: '0x00000000000000000000000000', // 13 bytes
                },
                storageSlot: '0x0000000000000000000000000000000000000000000000000000000000000000',
                storageProof: [
                    '0xf9011180a0c52caf0505888b98c4fdb6cc7fb993c8bfa0d2493c4a2232714597de0e30f93ba0a45972e0e9b41beea9353b4baf31bec3887b37ab6afb6dff65461d698f4e755f80a0c8d8343191741f6635e15c60124fe6139eb6a0bcff26bd218bcea6aa2ba9d5d780a0e25896acad5eaaaee6448a519b0a70703e204cfbfd24dbf0d8f1f9440fd1b76380808080a083d6f825867f6cd80c47813bb5ddba011af81f5307161638e071b35d78cb2355a08a817362bd366f643cf451342d0f4389ff30ccc1b0b57d1406a7dbfd41403114a0755be9568051fc4ea933f0f5c7aadc8a41111cdedc7126493d8619e47b6d34e080a03962f67c3da55876fa9c8136e015783a47e3f7f7afe3b5fb7e21a41bb474488c80',
                    '0xf851808080808080808080a024a86bc7418be3f6190af1879fc2850bd82f6e3152dc09bdeff4d3c6f02488038080808080a07ec6836338079e0c7d9bf221bfefa6b3bfec6c8b7eb60ed43240c1f84f99bf6880',
                    '0xf5a0200decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563939201020000000066b0e0ec0000000066ac4364',
                ],
            },
            rootClaim: {
                storageData: '0x825d2d3c51ea0ebdf25199ebb3e9d5835b6d61c407ef388ae4cde1f592306c95',
                storageSlot: '0x405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ad1',
                storageProof: [
                    '0xf9011180a0c52caf0505888b98c4fdb6cc7fb993c8bfa0d2493c4a2232714597de0e30f93ba0a45972e0e9b41beea9353b4baf31bec3887b37ab6afb6dff65461d698f4e755f80a0c8d8343191741f6635e15c60124fe6139eb6a0bcff26bd218bcea6aa2ba9d5d780a0e25896acad5eaaaee6448a519b0a70703e204cfbfd24dbf0d8f1f9440fd1b76380808080a083d6f825867f6cd80c47813bb5ddba011af81f5307161638e071b35d78cb2355a08a817362bd366f643cf451342d0f4389ff30ccc1b0b57d1406a7dbfd41403114a0755be9568051fc4ea933f0f5c7aadc8a41111cdedc7126493d8619e47b6d34e080a03962f67c3da55876fa9c8136e015783a47e3f7f7afe3b5fb7e21a41bb474488c80',
                    '0xf851808080a0bcf244817350e840bc02bd7cd6eb75b3ad4912a2b24da9135c0542105b6ed9f18080a0ffc8de2f5bfbf723124acf2fae24376730240ad1d809a16a76d1479c9444df4b80808080808080808080',
                    '0xf843a020b7834d611e25670b584f73a3e810d0a47c773fe173fc6975449e876b0a6a70a1a0825d2d3c51ea0ebdf25199ebb3e9d5835b6d61c407ef388ae4cde1f592306c95',
                ],
            },
        },
    },
    intent: {
        creator: actors.intentCreator,
        destinationChainId: networkIds.baseSepolia,
        rlpEncodedBlockData: '0xf90244a095ddb8d285b9bd821c252bd76af6d8a64abf16886062ac038fa55be2ebd69226a01dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347944200000000000000000000000000000000000011a066cddd76f9f8f6f808fccd9d484461a5650b4bc24a9295107fda5937c40fb603a0e62e83f32d6f125ff67d7ba42b63793d22ab8f66a3449fe208f49346aac036fca0e66a0ed55b4164d21792a1e72cd69c5034c342dda3cd8291460257fcc34d398ab901000410550004500300000000100404822088140404100020001a202280004200008148801102404008a8160001040000000010960a020480040400222001262008480030100a040020004120080010008418252000000408200600000014001020884000009a0928011020282150000880084000000202808900002090008100010484421428080040002003240040045908000a002004004400001008116001008300121040000a2600d20301424422010122030010e0008004a3220800404204610428020020002040090000409900600600c2808a1800001000015401037000103000000004000082402010498000080c09208040d4200010115950202110008083cc72058402aea540840103340f8466ac42ea80a0dba0d32a82245357c7d1290dca20cc2c7174d92ac57db13100b7fcc6a8e8534d88000000000000000083e32374a056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b4218080a01299a962bcf8d78b8be8d7a6e222cd281dc00f15e9cf849ef44693d7c1ed71ee',
        recipient: actors.recipient,
        targetTokens: [networks.baseSepolia.usdcAddress],
        targetAmounts: intent.targetAmounts,
        rewardTokens: [networks.ecoTestnet.usdcAddress],
        rewardAmounts: intent.rewardAmounts,
        duration: intent.duration,
        expiryTime: 1722568357,
        nonce: '0xde1584aa01b9f509801abbfe548f9f058cd130a3327c954ea86c28862f406e02',
        callData: '0xa9059cbb000000000000000000000000c0bc9ba69acd4806c4c48dd6fdfc1677212503e900000000000000000000000000000000000000000000000000000000000003e8',
        intentCreationTransaction: '0x59bcb1186ffbe99bdbd19633e0c8b21ad88a846b3eb42efc746c5cfe4075336f',
        intentHash: '0x9fcc6825d5739ef8c19f9ae1f891dc7e38e8433b9356aa940180a482c83774d0',
        intentFulfillTransaction: '0x5e2966449300edbfc9624a299775f5f5b4c9f090302f86f006cdf25541e1c64a',
        storageSlot: '0x6b0e2cc9e560d24849163fb156a2e3ce7401561e58af3e818f3310563f7a39d1',
        storageProof: [
            '0xf871a05f9c6bb6d8dac268bdc8670dd5b7fc2e8363796dfbc1e815d991b302e10f2a4f80a00bacadab995410b2b2b5d439313200f32d31c1bda0cb91245e26db2e9a6959d9808080a0ca7b42fddc49e95461129d80499b9ffaf475fed7ffe48f24514445ab8431800280808080808080808080',
            '0xf7a03fa068701e060c4458aed37ccfbc2f11383f20af4970287052a59f0b7e1a8c1d9594b4e2a27ed497e2d1ad0c8fb3a47803c934457c58',
        ],
        inboxContractData: [
            '0x01', // nonce
            '0x', // balance
            '0x4f224920f93782c9a6956f2e62f63098ea34fbbdff3679ed0665b3341b2fa92c', // storageHash
            '0x72ae6be9ad1195d833a50f76a1d2fe19c2d559449d1ed8abc754757c9f9e75dc', // codeHash
        ],
        accountProof: [
            '0xf90211a03b36b19e4e7f70e07935b315fea4969088b18a3fbd9a06678c9fc9c10f8123eaa06dbeafb5eb2cd654e09fc2ea8fd37c8aa7712df25d5eb691ea9752ee1e5fb6dfa0c3d6ae4e7dae0df97d71cb9a13191c07b18a10054696a306d80d4982d6c683cfa053898ba18743924ba9a396039ff77272f1ccc40c7cbf844448bea0688710026ca0726fd5645ec07a78d18a0c059662605b3e135a1253ae94d6cf9f3c3c654d5771a06a78e639d7f52b7888f541f0c1ce5dffdb9ba4cc687afbb8a44d25fc796f2d8ca01042a0edb3c58bd9f53735b1abee3681b0c81a698e819ee22381288eb6fa9b4ba00b5c8d003354268c1b59b76856e3d0dcddc1be3907562ae289c46fa7f2b79218a0573b6ee348a42c8490e3c06e1c642b73fec8c47432814fc6c1691c7e5bfbd0eca0826d44f1da25d9765562426dc0097747dd12ca5073cce4befb182f1b7c7a3825a0c843a4010c4877ea034156e989094635e6b46d668ac68f9829c0a1f0ba892403a0e6e699aff97558e4e8369f53cb04ae5b7ddb4574767c0021f6fcdcfb64174834a0b6193d549d43526a0adf858c12d75cfb8f9617572a09d9bb986bca67c428f671a0d43fc54794b663ac523e1ad600df68525ebafefe198bcfced0dfdcb7b08b00e2a010b1e7c54ff5386c974fe87b94ae24416e99a3f282bf8ec704eb5a8c8ec4cabda01b85c66231bbf6d3d0e628d2f23a1aa0e891c73425bdf03e7923d6b616cc788c80',
            '0xf90211a0da1154082f0741d064b40d92cd594e1ea8d37eeee9299e8c5a1fcad32cdb21eca05175de793eff3e572c1f3a224ecb2690c34b8a9a5c56f678e2a8addd100539f5a00684610a74359031c4fd37e840bdcbba137c8215d7ccfb545d0cc8c77230037aa06f8b6369af5220cea7244b9a988c3e8c50b1525462c1b22e34480b6a59235ba2a0c9bf404e37e60437d207a8d0a7c075af889e869f8154c6cfb4ca669aa0efe63fa00c20d2c9c4f4613eb1a55c6c461316f9e8d23b0467d900339cac6dc76de703eea016d1844f3930ccd0bc0773a9703f3c8525085cb2e98bc3a3024c322a09baf76da0b93827273ea1b00cfc84c4e0d4f2dd6fb8d153862b593c3241470aa3669c79a5a0b7033e9fbe767fb6b295d49cd87fd630e4e0dc9b191557463fc3b21f182b7c32a089ec968c2873f9b0021d98f0bb944ca76535d7e4bbfef4a20026d77adcf75416a0cd2d0edfa2b521a82c6d26f149c188a06d6efe76b0b78b5bceecc09ea18f7caba0022512dd39d8dbf78bedaba706d8f0db50884ac4ad434386b57ba37b38411e70a0bf1d09f43f594d629bf6a1f3b906dbac20bde6de70c8c4bf1d4e650dbc080acba0837e71bc53306e3a1ab34948d6cf78be2cbea61e3dccac48f8880b34a15b2dc1a0483a45d94c3f8dcddd96608605e02f482cd5245440a81bd2853581972d595253a0c2fbc34421f91fdc1e07366a5790b83bb59bd6b69415618220465f001b6c797380',
            '0xf90211a0648a21d8f5a4e6dc92da4defc275278141316d1afb328d4b9dd2ae69ce5f235ea07838fdff99f49e688dbeda1927b3985a518cda4bbe62a7b8ad0e09ddc6b85a3ba06262ea3babe90aacd0b85c33fa3de47ddf2ffd25fdfe9e49c1f04eadfdb666e5a0922d8cb7e8d8d7a4db259af7bec97bc950481fe12ae36770c2830f2c83a1e4eea080c5576e39c07dd031274fc70f9259fc52b28693b752df4655919885856dc783a05f7956e211d2dee47e100e41120c0b226011779819b017aa11f538e72b0bff16a0da475d39ab0bd9415b83d74a1ab44fc48ae992c09ba077fbd5629081d97a999aa0c574606334aa7f3cdab471a052194fc479fa6e6a329d4244d3f069bd5e9af8fea0b402b1272cafc5ff2de3bb26f407297312d242dcdff453571557d339f3c3c9a4a0c418e02866c7740843836137a57a11a67db02f39af51a18872df606c1befc342a0f417a0a8826b7311ab7a1105bc3c9f8e6529729840711723efd6c486cda885b6a003f2f59a12e6e035bf68d7a4ca8edfaecc6f56e97215a8c3c5c504063a3bc419a098eb5da74050c8fc0096fd4ce6017c6485deaaa3f3c05cd79f406ba12a7e1a8aa0eff0f7ded241c898751ad2d1a2f36f16ef1ff0779900614ca9e07d41bbe05b54a067bb02fb6f376485cef6b6358d22418b8ce852b3021440d0ae0b0092468cc961a0a28b1cbe1476a27a9d439abe545b95b3b95fc817d751bef14db3e21116f2b3eb80',
            '0xf90211a0bc632bbc734ba6b59c44001214cc9e31c85c6470d77462e91db875dd1966db1ca0916c02d04afb5b8e57eadd9432db367e4a34840d062c88c4f1c97671ee498df1a0803103fd746e23ad0454d02516b8eeba2a2988f6dd95f1794dab4bc1a167b0aba09e4b6b3e585bb355393aa785c95364ada724027658f2fe8261c3b50305c86b1ea0c4d546800353706df53d8d6c832a1a10f145ffd8d35c61aded7855b827f95bcba07a2f78957edb670e7e5de3b367a0d15f7dc8950aeecdbb892b44123d154c64eba0e0ea4e964b7edf4782e62b0b576efb52af645af848e08abed10e7d202bfb232ba0f4631565754b877eb582f7f72e5184db1d8eb192dfc0b476314fe5e4b30e4723a01e96ea10cc73121a5067873d7f5961b82cd05b7420a6274703b29ea00c516487a00ffb9b48af74ee380f5c03d5e70e09ea09ac9ec2893b07e45a38a3bdb4fc4b14a0978b3a4754c9cbc1dac020522ab2ecccb02a8c0b17dd38c12f96842b0b08d12da01791be417ad570b6f838016d816409607ee3a8a0d6814aa3af6534144e4f4fcea074b37c1631a97908e1f397f23d8ddee68bba4e5b75e07485065a76946005d3d0a04392693796fab8f5e673a607a0a3abc66842e4c94199e3cc7703ce7c6dca9c9da09cf89060f766834e1f746af8213b2f6b19f7e253c5128c3f842752c6e5af1f4ba02e54a62028c914d509336a8e84cd122944f349b5588e08170f2ab68a2392f2ca80',
            '0xf90211a06d14b92c6253f170ff88e96c5710b35c1b558f9c3027d8986a8291f0cd9d6b4ca05f40e17cf8367203206d44a1977afcf1cc753e69042e7d13f242e6e4edca205da0ff34954ec4ed8c7634eecffe95421679d4f8a0a2809b136c7b112e34d0281014a0e099cece66b77a70cc50f1052ac77762807cfdbeaf2510d0dc103e971d7b7526a07307d70016eb9b167912694d193a3708b6ddd83662b769fc5217e4ea79a632f9a0e620d7ece669d716f89efdfc0028319b6a0eaf4a97970f945720227f54552d32a01df8d6cff4d5c35612d1d02f097d42de2126499609c740e0c1119bfc0dbdcf7fa0db39f353ad7c174c97895e46a626d3965a57c1d80e39973f0d1d2bb723850575a0485e711135df6973e7ba64958718a5a3b826e9d87135039d8523c0405ef4126fa0c4f4ca19453e1a9368a263754cd3c1076855c621a07d518ea1d13aaf46665849a0967a148920b1e41f92cdede99ba17b38b0adfcd2456476f4bdf7d1a0f665cd14a0e0b405c9ff5500e20f86a99f660d8cffde4d16dd84b639eb2243da96bc26a041a0477cad28c4bf58b48f8576660d21404c339fe84a35806426f6ff729f094474e1a00ce23b4047e7c99e591224a7104d63385398d02f0f5243c613075dcbd49cd594a0089b66f4e13a769c9be4ac9e61c91aad4574b533933c4bb4de614a06f259c38aa05d34a6a7f87bc325a5885f5ce6d5932b55ff4f5c11e91d6d7311d65c33b3deb180',
            '0xf8d1808080a08e8227e110f9ea45cb4b4ab169d754efcfcba523dbfcd7123ef6ccee7d47599a808080a08ce61142b051a9358a6f30b07a94f3be51fc1d4ebee3fd09190b7ac202b546f5808080a00a7cb99b6dda92f680a2cec026306d4252ca6be77ceb34d2326ae10d849bac1180a0cbe57d0f39869fd5ce2ccad723d3ee7c82d6e8c6748cf58ae7bbd8b192d3c3bba046902708980ceca7830e282f2856344e33040c6ed238bd5a5f44d0c39fdfe68fa053b5f10d4c5d3d80963f09d0d45960f0f62e604ffdb99faeb5911069ce352e4280',
            '0xf8679e20b048d78670e1d3f8422e017953345c89a0cd0164ed149eaec42f96c4d9b846f8440180a04f224920f93782c9a6956f2e62f63098ea34fbbdff3679ed0665b3341b2fa92ca072ae6be9ad1195d833a50f76a1d2fe19c2d559449d1ed8abc754757c9f9e75dc',
        ],
    },
};
exports.cannon = cannon;
