/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  HTSTokenOwner,
  HTSTokenOwnerInterface,
} from "../../contracts/HTSTokenOwner";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burnToken",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "delegateTransferFrom",
    outputs: [
      {
        internalType: "int64",
        name: "responseCode",
        type: "int64",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "serialNumber",
        type: "uint256",
      },
    ],
    name: "delegateTransferFromNFT",
    outputs: [
      {
        internalType: "int64",
        name: "responseCode",
        type: "int64",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "erc20address",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "freeze",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mintToken",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "pause",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_erc20address",
        type: "address",
      },
    ],
    name: "setERC20Address",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "tranferContract",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "int64",
        name: "responseCode",
        type: "int64",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "serialNumber",
        type: "uint256",
      },
    ],
    name: "transferFromNFT",
    outputs: [
      {
        internalType: "int64",
        name: "responseCode",
        type: "int64",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "unfreeze",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "unpause",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "amount",
        type: "uint32",
      },
    ],
    name: "wipeToken",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061119e806100206000396000f3fe608060405234801561001057600080fd5b50600436106100d55760003560e01c806376a67a511161008757806376a67a511461019657806379c65068146101a95780639b23d3d9146101bc578063d1df306c146101cf578063d4e2b896146101e2578063e192545a146101f5578063eac6f3fe14610208578063f18d03cc1461021b57600080fd5b806311e1fc07146100da578063157482501461010557806315dacbea1461012857806341bec0d21461013b57806357b001f9146101505780635adb6ddb146101635780636a83b7e914610176575b600080fd5b6100ed6100e8366004610cc0565b61022e565b60405160079190910b81526020015b60405180910390f35b610118610113366004610d0b565b61030f565b60405190151581526020016100fc565b6100ed610136366004610cc0565b610365565b61014e610149366004610d3e565b610410565b005b61011861015e366004610d3e565b61048b565b610118610171366004610d0b565b6104d5565b600054610189906001600160a01b031681565b6040516100fc9190610d60565b6101186101a4366004610d3e565b61050c565b6101186101b7366004610d74565b610542565b6100ed6101ca366004610cc0565b6105b3565b6101186101dd366004610d74565b6105e3565b6101186101f0366004610d9e565b610637565b610118610203366004610dee565b610683565b6100ed610216366004610cc0565b6106bc565b610118610229366004610cc0565b6106ec565b60008060006101676001600160a01b0316639b23d3d960e01b8888888860405160240161025e9493929190610e2a565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b031990941693909317909252905161029c9190610e84565b600060405180830381855af49150503d80600081146102d7576040519150601f19603f3d011682016040523d82523d6000602084013e6102dc565b606091505b5091509150816102ed576015610301565b808060200190518101906103019190610eb2565b60030b979650505050505050565b600080546001600160a01b031633146103435760405162461bcd60e51b815260040161033a90610ecd565b60405180910390fd5b600061034f848461073a565b60070b905061035d8161081d565b949350505050565b60008060006101676001600160a01b03166315dacbea60e01b888888886040516024016103959493929190610e2a565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b03199094169390931790925290516103d39190610e84565b6000604051808303816000865af19150503d80600081146102d7576040519150601f19603f3d011682016040523d82523d6000602084013e6102dc565b6000546001600160a01b0316156104695760405162461bcd60e51b815260206004820152601d60248201527f4552433230206164647265737320616c726561647920646566696e6564000000604482015260640161033a565b600080546001600160a01b0319166001600160a01b0392909216919091179055565b600080546001600160a01b031633146104b65760405162461bcd60e51b815260040161033a90610ecd565b60006104c18361085f565b90506104cc8161081d565b9150505b919050565b600080546001600160a01b031633146105005760405162461bcd60e51b815260040161033a90610ecd565b600061034f8484610939565b600080546001600160a01b031633146105375760405162461bcd60e51b815260040161033a90610ecd565b60006104c18361096f565b600080546001600160a01b0316331461056d5760405162461bcd60e51b815260040161033a90610ecd565b604080516000808252602082019092526105a69085908590846105a0565b606081526020019060019003908161058b5790505b50610999565b5050905061035d8161081d565b60008060006101676001600160a01b0316639b23d3d960e01b888888886040516024016103959493929190610e2a565b600080546001600160a01b0316331461060e5760405162461bcd60e51b815260040161033a90610ecd565b6040805160008082526020820190925261062b9085908590610a97565b50905061035d8161081d565b600080546001600160a01b031633146106625760405162461bcd60e51b815260040161033a90610ecd565b600061066f858585610b80565b905061067a8161081d565b95945050505050565b600080546001600160a01b031633146106ae5760405162461bcd60e51b815260040161033a90610ecd565b600061066f85308686610c61565b60008060006101676001600160a01b03166315dacbea60e01b8888888860405160240161025e9493929190610e2a565b600080546001600160a01b031633146107175760405162461bcd60e51b815260040161033a90610ecd565b600061072586868686610c61565b90506107308161081d565b9695505050505050565b6040516001600160a01b0383811660248301528216604482015260009081908190610167906316e3e16160e21b906064015b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b03199094169390931790925290516107aa9190610e84565b6000604051808303816000865af19150503d80600081146107e7576040519150601f19603f3d011682016040523d82523d6000602084013e6107ec565b606091505b5091509150816107fd576015610811565b808060200190518101906108119190610eb2565b60030b95945050505050565b6000601682146108575760405162461bcd60e51b815260206004820152600560248201526422b93937b960d91b604482015260640161033a565b506001919050565b60008060006101676001600160a01b0316633b3bff0f60e01b856040516024016108899190610d60565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b03199094169390931790925290516108c79190610e84565b6000604051808303816000865af19150503d8060008114610904576040519150601f19603f3d011682016040523d82523d6000602084013e610909565b606091505b50915091508161091a57601561092e565b8080602001905181019061092e9190610eb2565b60030b949350505050565b6040516001600160a01b0383811660248301528216604482015260009081908190610167906352f9138760e01b9060640161076c565b60008060006101676001600160a01b0316637c41ad2c60e01b856040516024016108899190610d60565b60008060606000806101676001600160a01b031663278e0b8860e01b8989896040516024016109ca93929190610f25565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051610a089190610e84565b6000604051808303816000865af19150503d8060008114610a45576040519150601f19603f3d011682016040523d82523d6000602084013e610a4a565b606091505b509150915081610a6d576040805160008082526020820190925260159190610a81565b80806020019051810190610a819190610fea565b60039290920b9a90995090975095505050505050565b6000806000806101676001600160a01b031663acb9cff960e01b888888604051602401610ac6939291906110d2565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051610b049190610e84565b6000604051808303816000865af19150503d8060008114610b41576040519150601f19603f3d011682016040523d82523d6000602084013e610b46565b606091505b509150915081610b595760156000610b6d565b80806020019051810190610b6d919061113e565b60039190910b9890975095505050505050565b604080516001600160a01b0385811660248301528416604482015263ffffffff831660648083019190915282518083039091018152608490910182526020810180516001600160e01b0316639790686d60e01b17905290516000918291829161016791610bed9190610e84565b6000604051808303816000865af19150503d8060008114610c2a576040519150601f19603f3d011682016040523d82523d6000602084013e610c2f565b606091505b509150915081610c40576015610c54565b80806020019051810190610c549190610eb2565b60030b9695505050505050565b6040516001600160a01b038581166024830152848116604483015283166064820152600782900b6084820152600090819081906101679063eca3691760e01b9060a401610395565b80356001600160a01b03811681146104d057600080fd5b60008060008060808587031215610cd657600080fd5b610cdf85610ca9565b9350610ced60208601610ca9565b9250610cfb60408601610ca9565b9396929550929360600135925050565b60008060408385031215610d1e57600080fd5b610d2783610ca9565b9150610d3560208401610ca9565b90509250929050565b600060208284031215610d5057600080fd5b610d5982610ca9565b9392505050565b6001600160a01b0391909116815260200190565b60008060408385031215610d8757600080fd5b610d9083610ca9565b946020939093013593505050565b600080600060608486031215610db357600080fd5b610dbc84610ca9565b9250610dca60208501610ca9565b9150604084013563ffffffff81168114610de357600080fd5b809150509250925092565b600080600060608486031215610e0357600080fd5b610e0c84610ca9565b9250610e1a60208501610ca9565b9150604084013590509250925092565b6001600160a01b039485168152928416602084015292166040820152606081019190915260800190565b60005b83811015610e6f578181015183820152602001610e57565b83811115610e7e576000848401525b50505050565b60008251610e96818460208701610e54565b9190910192915050565b8051600381900b81146104d057600080fd5b600060208284031215610ec457600080fd5b610d5982610ea0565b60208082526022908201527f43616c6c6572206973206e6f7420486564657261455243323020636f6e74726160408201526118dd60f21b606082015260800190565b634e487b7160e01b600052604160045260246000fd5b60006060820160018060a01b0386168352602067ffffffffffffffff8616818501526060604085015281855180845260808601915060808160051b870101935082870160005b82811015610fb157878603607f1901845281518051808852610f9281888a01898501610e54565b601f01601f191696909601850195509284019290840190600101610f6b565b50939998505050505050505050565b805167ffffffffffffffff811681146104d057600080fd5b8051600781900b81146104d057600080fd5b600080600060608486031215610fff57600080fd5b61100884610ea0565b92506020611017818601610fc0565b9250604085015167ffffffffffffffff8082111561103457600080fd5b818701915087601f83011261104857600080fd5b81518181111561105a5761105a610f0f565b8060051b604051601f19603f8301168101818110858211171561107f5761107f610f0f565b60405291825284820192508381018501918a83111561109d57600080fd5b938501935b828510156110c2576110b385610fd8565b845293850193928501926110a2565b8096505050505050509250925092565b6001600160a01b038416815267ffffffffffffffff83166020808301919091526060604083018190528351908301819052600091848101916080850190845b8181101561113057845160070b83529383019391830191600101611111565b509098975050505050505050565b6000806040838503121561115157600080fd5b61115a83610ea0565b9150610d3560208401610fc056fea2646970667358221220679964863718a8db4fbc530d3f24302f6a496cf340cde6596b1b9142c53a0a2164736f6c634300080a0033";

type HTSTokenOwnerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: HTSTokenOwnerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class HTSTokenOwner__factory extends ContractFactory {
  constructor(...args: HTSTokenOwnerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<HTSTokenOwner> {
    return super.deploy(overrides || {}) as Promise<HTSTokenOwner>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): HTSTokenOwner {
    return super.attach(address) as HTSTokenOwner;
  }
  override connect(signer: Signer): HTSTokenOwner__factory {
    return super.connect(signer) as HTSTokenOwner__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): HTSTokenOwnerInterface {
    return new utils.Interface(_abi) as HTSTokenOwnerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): HTSTokenOwner {
    return new Contract(address, _abi, signerOrProvider) as HTSTokenOwner;
  }
}
