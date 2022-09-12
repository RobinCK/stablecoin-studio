import { Key } from '@hashgraph/sdk';
import PublicKey from '../../../../src/domain/context/account/PublicKey.js';
import { SDK } from '../../../../src/index.js';
import { ACCOUNTS, getSDK } from '../../../core.js';

describe('🧪 [PORT] SDK', () => {
	let sdk: SDK;

	beforeAll(async () => {
		sdk = await getSDK();
	});

	it('Creates a Stable Coin with EOAccount', async () => {
		const coin = await sdk.createStableCoin({
			accountId: ACCOUNTS.testnet.accountId.id,
			privateKey: ACCOUNTS.testnet.privateKey.key,
			name: 'TEST COIN',
			symbol: 'TC',
			decimals: 0,
		});
		expect(coin).not.toBeNull();
		expect(coin?.id).toBeTruthy();
	}, 120_000);

	it('Gets the token info', async () => {
		const coin = await sdk.getStableCoin({
			id: '0.0.48195895',
		});
		expect(coin).not.toBeNull();
		expect(coin?.decimals).toBeGreaterThanOrEqual(0);
		expect(coin?.adminKey).toBeInstanceOf(PublicKey);
		expect(coin?.name).toBeTruthy();
		expect(coin?.symbol).toBeTruthy();
	});

	it('Gets the token list', async () => {
		const list = await sdk.getListStableCoin({
			privateKey: ACCOUNTS.testnet.privateKey.key,
		});
		expect(list).not.toBeNull();
	});

	it('Gets contract id from public key', async () => {
		console.log(Buffer.from('420518f3c4fe16').toString("hex").length)
		// console.log(Key._fromProtobufKey({ ed25519: '420518f3c4fe16' }));
	})
});
