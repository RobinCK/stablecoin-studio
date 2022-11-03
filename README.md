<div align="center">

# Hedera Stable Coin

[![License](https://img.shields.io/badge/license-apache2-blue.svg)](LICENSE)

</div>

### Table of Contents
**[Overview](#Overview)**<br>
**[Stable Coin definition](#Stable-Coin-definition)**<br>

# Overview
This solution consists of a set of tools, including Smart Contracts, SDK, CLI and UI to facilitate the deployment and management of Stable Coins in Hedera Hashgraph.

## Stable Coin definition
A Stable Coin is a **decorator** to a standard Hedera Token.
Each stable coin maps to an *underlying* Hedera Token and adds the following functionality:

- **Multiple Roles**:
  Hedera Tokens's operations (Wipe, Pause, ...) can only be performed by the Accounts to which they are assigned (WipeKey, PauseKey, ...). 

  Stable Coins allow for multiple accounts to share the same operation rights, we can wipe/pause/... tokens using any of the accounts with the wipe/pause/... role respectively.
- **Supply Role split into Cash-in and Burn roles**:
  The Hedera Token's supply account has the right to change the supply of the token, it can be used to mint and burn tokens.

  Stable Coins split the supply role in two, the *cash-in* and the *burn* roles which can be assigned to different accounts.

- **Cash-in role**:
  When hedera tokens are minted, they are automatically assigned to the treasury account. If we want to assign them to another account, a second transaction    (signed by the treasury account) is required to transfer the tokens.

  Stable Coins implement a "cash-in" operation that allows cash-in role owners to mint and assign tokens to any account in a single transaction.
  The cash-in role comes in two flavours: 
  - *unlimited*: Accounts with the unlimited cash-in role can mint as many tokens as they wish (as long as the total supply does not exceed the max supply)
  - *limited*: Accounts with the limited cash-in role can only mint a limited number of tokens. The maximum cash-in amount is defined for each account individually and can be increased/deacreased at any time by the admin account. 

- **Rescue role**:
  The treasury account for a Stable Coin's underlying token is the main Stable Coin Smart contract itself. Any token assigned to the treasury account can be managed by accounts having the *rescue* role. 
  It is important to note that the initial supply of tokens (minted when the Hedera token was created) is always assigned to the treasury account, which means that rescue role accounts will be required to transfer those tokens to other accounts.

> The account deploying the Stable Coin will also be the administrator of the underlying token, which means that at any point, that account could completely bypass the Stable Coin and interact with the underlying token directly in order to change the keys associated to the roles. This could completely decoupled the Stable Coin from the underlying token making the above mentioned functionalities useless.

## Creating Stable Coins
Every time a stable coin is created, a new Hedera Token is created (the underlying token) and two smart contracts are deployed:
- The Stable Coin logic smart contract: with all the functonality described above.
- the Stable Coin proxy smart contract: pointing to the stbale coin logic smart contract. Proxies are used to make stable coins upgradable.

Users interact with the Stable Coin proxy smart contract because its address will never changed. Stable Coin logic smart contract addresses change if a new version is deployed. 

## Managing Stable Coins
Every time a stable coin is deployed, the deploying account will be defined as the Stable Coin administrator (and the underlying token adminsitrator too). That account will have the possibility to assign and remove any role to any account, increase and decrease cash-in limits etc...

# Project structure

There are 4 modules:
````
  /cli            
  /contracts    
  /sdk          
  /web          
````

- **`/cli`:** A CLI tool for Node to manage and operate on stable coins.
- **`/contracts`:** The solidity smart contracts on which the stable coins are based on.
- **`/sdk`:** The SDK that implements the features to manage and operate stable coins.
- **`/web`:** A DAPP developed with React to manage and operate on stable coins.

Learn more about them in their README:
- [cli](https://github.com/hashgraph/hedera-accelerator-stablecoin/tree/main/cli#readme) 
- [contracts](https://github.com/hashgraph/hedera-accelerator-stablecoin/tree/main/contracts#readme) 
- [sdk](https://github.com/hashgraph/hedera-accelerator-stablecoin/tree/main/sdk#readme) 
- [web](https://github.com/hashgraph/hedera-accelerator-stablecoin/tree/main/web#readme) 


# Technologies

Typescript 4.7 or higher is highly reccomended to work with the repositories.


# Installing

In a terminal:

````
npm install
````
This will install the dependencies in all projects and setup the links between them.

You can now start developing on any of the modules.

# Building
When making modifications to any of the modules, you have to re-compile the dependencies, in this order, depending on which ones the modifications where made:
````bash
  // 1st
  $ npm run build:contracts
  // 2nd
  $ npm run build:sdk
  // 3rd
  $ npm run build:cli
  // or
  $ npm run build:web
````

Or within any of the modules:
````bash
  $ cd [module] // sdk, web, contracts, etc
  $ npm run build
````

# Support

If you have a question on how to use the product, please see our
[support guide](https://github.com/hashgraph/.github/blob/main/SUPPORT.md).

# Contributing

Contributions are welcome. Please see the
[contributing guide](https://github.com/hashgraph/.github/blob/main/CONTRIBUTING.md)
to see how you can get involved.

# Code of Conduct

This project is governed by the
[Contributor Covenant Code of Conduct](https://github.com/hashgraph/.github/blob/main/CODE_OF_CONDUCT.md). By
participating, you are expected to uphold this code of conduct. Please report unacceptable behavior
to [oss@hedera.com](mailto:oss@hedera.com).

## License

[Apache License 2.0](LICENSE)
