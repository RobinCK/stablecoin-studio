import Service from '../Service.js';
import ICreateStableCoinServiceRequestModel from './model/ICreateStableCoinServiceRequestModel.js';
import { IListStableCoinServiceRequestModel } from './model/IListStableCoinServiceRequestModel.js';
import { StableCoin } from '../../../domain/context/stablecoin/StableCoin.js';
import IStableCoinList from '../../../port/in/sdk/response/IStableCoinList.js';
import IGetStableCoinServiceRequestModel from './model/IGetStableCoinServiceRequestModel.js';
import IGetBalanceOfStableCoinServiceRequestModel from './model/IGetBalanceOfStableCoinServiceRequestModel.js';
import IGetNameOfStableCoinServiceRequestModel from './model/IGetNameOfStableCoinServiceRequestModel.js';
import ICashInStableCoinServiceRequestModel from './model/ICashInStableCoinServiceRequestModel.js';
import IAssociateTokenStableCoinServiceRequestModel from './model/IAssociateTokenStableCoinServiceRequestModel.js';
import IWipeStableCoinServiceRequestModel from './model/IWipeStableCoinServiceRequestModel.js';
import IStableCoinRepository from '../../../port/out/stablecoin/IStableCoinRepository.js';
import ISupplierRoleStableCoinServiceRequestModel from './model/ISupplierRoleStableCoinServiceRequestModel';
import IRescueStableCoinServiceRequestModel from './model/IRescueStableCoinServiceRequestModel.js';
import IStableCoinDetail from '../../../port/out/stablecoin/types/IStableCoinDetail.js';

export default class StableCoinService extends Service {
	private repository: IStableCoinRepository;

	constructor(repository: IStableCoinRepository) {
		super();
		this.repository = repository;
	}

	/**
	 * createStableCoin
	 */
	public createStableCoin(
		req: ICreateStableCoinServiceRequestModel,
	): Promise<StableCoin> {
		const coin: StableCoin = new StableCoin({
			name: req.name,
			symbol: req.symbol,
			decimals: req.decimals,
			initialSupply: req.initialSupply,
			maxSupply: req.maxSupply,
			memo: req.memo,
			freezeKey: req.freezeKey,
			freezeDefault: req.freezeDefault,
			kycKey: req.kycKey,
			wipeKey: req.wipeKey,
			supplyKey: req.supplyKey,
			treasury: req.treasury,
			tokenType: req.tokenType,
			supplyType: req.supplyType,
			id: req.id,
			autoRenewAccount: req.autoRenewAccount,
		});
		return this.repository.saveCoin(req.accountId, req.privateKey, coin);
	}

	/**
	 * getListStableCoins
	 */
	public async getListStableCoins(
		req: IListStableCoinServiceRequestModel,
	): Promise<IStableCoinList[]> {
		return this.repository.getListStableCoins(req.privateKey);
	}

	/**
	 * getListStableCoins
	 */
	public async getStableCoin(
		req: IGetStableCoinServiceRequestModel,
	): Promise<StableCoin> {
		return this.repository.getStableCoin(req.id);
	}

	public async getBalanceOf(
		req: IGetBalanceOfStableCoinServiceRequestModel,
	): Promise<Uint8Array> {
		return this.repository.getBalanceOf(
			req.proxyContractId,
			req.privateKey,
			req.accountId,
			req.targetId,
		);
	}

	public async getNameToken(
		req: IGetNameOfStableCoinServiceRequestModel,
	): Promise<Uint8Array> {
		return this.repository.getNameToken(
			req.proxyContractId,
			req.privateKey,
			req.accountId,
		);
	}

	public async cashIn(
		req: ICashInStableCoinServiceRequestModel,
	): Promise<Uint8Array> {
		// TODO validation
		const coin: StableCoin = await this.getStableCoin({
			id: req.tokenId,
		});
		const amount = coin.getAmount(req.amount);
		if (amount > coin.maxSupply - coin.totalSupply) {
			throw new Error('Amount is bigger than allowed supply');
		}
		return this.repository.cashIn(
			req.proxyContractId,
			req.privateKey,
			req.accountId,
			amount,
		);
	}

	public async associateToken(
		req: IAssociateTokenStableCoinServiceRequestModel,
	): Promise<Uint8Array> {
		return this.repository.associateToken(
			req.proxyContractId,
			req.privateKey,
			req.accountId,
		);
	}

	public async wipe(
		req: IWipeStableCoinServiceRequestModel,
	): Promise<Uint8Array> {
		return this.repository.wipe(
			req.proxyContractId,
			req.privateKey,
			req.accountId,
			req.amount,
		);
	}

	public async rescue(
		req: IRescueStableCoinServiceRequestModel,
	): Promise<Uint8Array> {
		return this.repository.rescue(
			req.proxyContractId,
			req.privateKey,
			req.accountId,
			req.amount,
		);
	}

	public async grantSupplierRole(
		req: ISupplierRoleStableCoinServiceRequestModel,
	): Promise<Uint8Array> {
		return this.repository.grantSupplierRole(
			req.proxyContractId,
			req.address,
			req.privateKey,
			req.accountId,
			req.amount,
		);
	}

	public async isUnlimitedSupplierAllowance(
		req: ISupplierRoleStableCoinServiceRequestModel,
	): Promise<Uint8Array> {
		return this.repository.isUnlimitedSupplierAllowance(
			req.proxyContractId,
			req.address,
			req.privateKey,
			req.accountId,
		);
	}
	public async supplierAllowance(
		req: ISupplierRoleStableCoinServiceRequestModel,
	): Promise<Uint8Array> {
		return this.repository.supplierAllowance(
			req.proxyContractId,
			req.address,
			req.privateKey,
			req.accountId,
		);
	}
	public async revokeSupplierRole(
		req: ISupplierRoleStableCoinServiceRequestModel,
	): Promise<Uint8Array> {
		return this.repository.revokeSupplierRole(
			req.proxyContractId,
			req.address,
			req.privateKey,
			req.accountId,
		);
	}
	public async resetSupplierAllowance(
		req: ISupplierRoleStableCoinServiceRequestModel,
	): Promise<Uint8Array> {
		return this.repository.resetSupplierAllowance(
			req.proxyContractId,
			req.address,
			req.privateKey,
			req.accountId,
		);
	}
	public async increaseSupplierAllowance(
		req: ISupplierRoleStableCoinServiceRequestModel,
	): Promise<Uint8Array> {
		return this.repository.increaseSupplierAllowance(
			req.proxyContractId,
			req.address,
			req.privateKey,
			req.accountId,
			req.amount,
		);
	}
	public async decreaseSupplierAllowance(
		req: ISupplierRoleStableCoinServiceRequestModel,
	): Promise<Uint8Array> {
		return this.repository.decreaseSupplierAllowance(
			req.proxyContractId,
			req.address,
			req.privateKey,
			req.accountId,
			req.amount,
		);
	}

	public async isLimitedSupplierAllowance(
		req: ISupplierRoleStableCoinServiceRequestModel,
	): Promise<Uint8Array> {
		return this.repository.isLimitedSupplierAllowance(
			req.proxyContractId,
			req.address,
			req.privateKey,
			req.accountId,
		);
	}
}
