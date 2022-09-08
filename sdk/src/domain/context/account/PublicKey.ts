import { ValueObject } from '../../../core/types.js';
import { PublicKeyNotValid } from './error/PublicKeyNotValid.js';

export class PublicKey extends ValueObject<string> {
	public readonly key: string;
	public readonly type: string;
	constructor(params: { key: string; type: string }) {
		const { key, type } = params;
		super(key);
		this.validate(key);
		this.key = key;
		this.type = type;
	}

	public toString(): string {
		return JSON.stringify({
			key: this.key,
			_type: this.type,
		});
	}

	public validate(str?: string): void {
		if (!str) throw new PublicKeyNotValid(str ?? 'undefined');
	}
}
