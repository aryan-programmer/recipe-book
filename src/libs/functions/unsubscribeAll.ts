import {Subscription} from "rxjs";

function unsubscribeAll (...subscriptions: Subscription[]) {
	for (const subscription of subscriptions) {
		subscription.unsubscribe();
	}
}

export default unsubscribeAll;
export {unsubscribeAll};
