const nonMutatingArrayMethods = ["concat", "entries", "every", "filter", "find", "findIndex", "flatMap", "forEach", "includes", "indexOf", "join", "keys", "lastIndexOf", "map", "reduce", "reduceRight", "slice", "some", "toString", "toLocaleString", "values", ];

function observeArrayChanges<T> (ts: T[], change: (ts: T[]) => void) {
	return new Proxy(ts, {
		set (target: T[], p: string | number | symbol, value: any): boolean {
			// @ts-ignore
			target[p] = value;
			change(target);
			return true;
		},
		get (target: T[], p: string | number | symbol): any {
			// @ts-ignore
			const ret = target[p];
			if (typeof ret === 'function' && !nonMutatingArrayMethods.includes(p as string)) {
				// tslint:disable-next-line:only-arrow-functions
				return function (...args: any[]) {
					// @ts-ignore
					// tslint:disable-next-line:variable-name
					const ret_ = target[p](...args);
					change(target);
					return ret_;
				};
			}
			return ret;
		}
	});
}

export default observeArrayChanges;
export {observeArrayChanges};
