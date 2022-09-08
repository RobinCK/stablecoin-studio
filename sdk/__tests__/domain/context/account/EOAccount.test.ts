import AccountId from '../../../../src/domain/context/account/AccountId.js';
import EOAccount from '../../../../src/domain/context/account/EOAccount.js';
import PrivateKey from '../../../../src/domain/context/account/PrivateKey.js';
import DomainError from '../../../../src/domain/error/DomainError.js';
import { ACCOUNTS } from '../../../core.js';

describe('🧪 [DOMAIN] EOAccount', () => {
	it('Instantiate the class', () => {
		const account = new EOAccount({
			accountId: ACCOUNTS.testnet.accountId,
			privateKey: ACCOUNTS.testnet.privateKey,
		});
		expect(account).not.toBeNull();
	});

	it('Create an instance with all properties', () => {
		const account = new EOAccount({
			accountId: ACCOUNTS.testnet.accountId,
			privateKey: ACCOUNTS.testnet.privateKey,
		});
		expect(account).not.toBeNull();
		expect(account.accountId).toBe(ACCOUNTS.testnet.accountId);
		expect(account.privateKey).toBe(ACCOUNTS.testnet.privateKey);
	});

	it('Expect to fail on invalid account id', () => {
		expect(() => new AccountId('invalid account id')).toThrowError(
			DomainError,
		);
	});

	it('Expect to fail on invalid private key', () => {
		expect(() => new PrivateKey('invalid key')).toThrowError(DomainError);
	});
});
