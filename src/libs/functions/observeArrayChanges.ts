import {Object} from "../types";

type OthT<T> = T[] & Object;

function observeArrayChanges<T> (ts: T[], change: (ts: T[]) => void) {
	const noTrackMethods = new Set<string | symbol>(["concat", "entries", "every", "filter", "find", "findIndex", "flatMap", "forEach", "includes", "indexOf", "join", "keys", "lastIndexOf", "map", "reduce", "reduceRight", "slice", "some", "toString", "toLocaleString", "values"]);
	return new Proxy(ts as OthT<T>, {
		set (target: OthT<T>, p: string | number | symbol, value: any): boolean {
			target[p] = value;
			change(target);
			return true;
		},
		get (target: OthT<T>, p: string | number | symbol): any {
			if (typeof p === 'number') return target[p];
			if (typeof p === 'symbol') {
				return target[p];
			}
			const ret = target[p];
			if (typeof ret === 'function' && !noTrackMethods.has(p)) {
				noTrackMethods.add(p);
				return target[p] = function (...args: any[]) {
					const ret_ = (ret as Function).call(target, ...args);
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
