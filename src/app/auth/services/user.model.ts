import nn from "../../../libs/functions/nn";

export class User {
	constructor (
		public readonly email: string,
		public readonly id: string,
		private readonly _token: string,
		private readonly _tokenExpiryDate: Date,
	) {
	}

	static fromObject(obj: any){
		return new User(
			nn(obj.email),
			nn(obj.id),
			nn(obj._token),
			new Date(nn(obj._tokenExpiryDate))
		);
	}

	get token (): string | null {
		if(this._tokenExpiryDate == null || new Date()>this._tokenExpiryDate){
			return null;
		}
		return this._token;
	}

	get tokenExpiryDate (): Date {
		return this._tokenExpiryDate;
	}
}
