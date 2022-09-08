/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  PayableOverrides,
  BytesLike,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  HederaERC1967Proxy,
  HederaERC1967ProxyInterface,
} from "../../contracts/HederaERC1967Proxy";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_logic",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "getImplementation",
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
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x608060405260405161078038038061078083398101604081905261002291610318565b818161003082826000610039565b50505050610435565b6100428361006f565b60008251118061004f5750805b1561006a5761006883836100af60201b61008b1760201c565b505b505050565b610078816100db565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606100d48383604051806060016040528060278152602001610759602791396101ad565b9392505050565b6100ee8161028b60201b6100b71760201c565b6101555760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b60648201526084015b60405180910390fd5b8061018c7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b61029a60201b6100c61760201c565b80546001600160a01b0319166001600160a01b039290921691909117905550565b60606001600160a01b0384163b6102155760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b606482015260840161014c565b600080856001600160a01b03168560405161023091906103e6565b600060405180830381855af49150503d806000811461026b576040519150601f19603f3d011682016040523d82523d6000602084013e610270565b606091505b50909250905061028182828661029d565b9695505050505050565b6001600160a01b03163b151590565b90565b606083156102ac5750816100d4565b8251156102bc5782518084602001fd5b8160405162461bcd60e51b815260040161014c9190610402565b634e487b7160e01b600052604160045260246000fd5b60005b838110156103075781810151838201526020016102ef565b838111156100685750506000910152565b6000806040838503121561032b57600080fd5b82516001600160a01b038116811461034257600080fd5b60208401519092506001600160401b038082111561035f57600080fd5b818501915085601f83011261037357600080fd5b815181811115610385576103856102d6565b604051601f8201601f19908116603f011681019083821181831017156103ad576103ad6102d6565b816040528281528860208487010111156103c657600080fd5b6103d78360208301602088016102ec565b80955050505050509250929050565b600082516103f88184602087016102ec565b9190910192915050565b60208152600082518060208401526104218160408501602087016102ec565b601f01601f19169190910160400192915050565b610315806104446000396000f3fe6080604052600436106100225760003560e01c8063aaf10f421461003957610031565b366100315761002f61006a565b005b61002f61006a565b34801561004557600080fd5b5061004e61007c565b6040516001600160a01b03909116815260200160405180910390f35b61007a6100756100c9565b6100fc565b565b60006100866100c9565b905090565b60606100b083836040518060600160405280602781526020016102b960279139610120565b9392505050565b6001600160a01b03163b151590565b90565b60006100867f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc546001600160a01b031690565b3660008037600080366000845af43d6000803e80801561011b573d6000f35b3d6000fd5b606061012b846100b7565b61018b5760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b60648201526084015b60405180910390fd5b600080856001600160a01b0316856040516101a69190610269565b600060405180830381855af49150503d80600081146101e1576040519150601f19603f3d011682016040523d82523d6000602084013e6101e6565b606091505b50915091506101f6828286610200565b9695505050505050565b6060831561020f5750816100b0565b82511561021f5782518084602001fd5b8160405162461bcd60e51b81526004016101829190610285565b60005b8381101561025457818101518382015260200161023c565b83811115610263576000848401525b50505050565b6000825161027b818460208701610239565b9190910192915050565b60208152600082518060208401526102a4816040850160208701610239565b601f01601f1916919091016040019291505056fe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a26469706673582212205064ff86e0dbe442fa322ad874205079ef7175b7f530dcdf0efdb0d57f17d4d664736f6c634300080a0033416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564";

type HederaERC1967ProxyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: HederaERC1967ProxyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class HederaERC1967Proxy__factory extends ContractFactory {
  constructor(...args: HederaERC1967ProxyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _logic: PromiseOrValue<string>,
    _data: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<HederaERC1967Proxy> {
    return super.deploy(
      _logic,
      _data,
      overrides || {}
    ) as Promise<HederaERC1967Proxy>;
  }
  override getDeployTransaction(
    _logic: PromiseOrValue<string>,
    _data: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_logic, _data, overrides || {});
  }
  override attach(address: string): HederaERC1967Proxy {
    return super.attach(address) as HederaERC1967Proxy;
  }
  override connect(signer: Signer): HederaERC1967Proxy__factory {
    return super.connect(signer) as HederaERC1967Proxy__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): HederaERC1967ProxyInterface {
    return new utils.Interface(_abi) as HederaERC1967ProxyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): HederaERC1967Proxy {
    return new Contract(address, _abi, signerOrProvider) as HederaERC1967Proxy;
  }
}
