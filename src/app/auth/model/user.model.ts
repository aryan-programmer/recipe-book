export type User = {
	email: string,
	id: string,
	token: string,
	tokenExpiryMs: number,
};

export function getToken (user: User): string | null {
	if (user.tokenExpiryMs == null || new Date().getTime() > user.tokenExpiryMs) {
		return null;
	}
	return user.token;
}
