import {OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

export class HasSubscriptions implements OnDestroy {
	protected subscriptions: Subscription[];

	constructor () {
	}

	ngOnDestroy (): void {
		for (const subscription of this.subscriptions) {
			subscription.unsubscribe();
		}
	}
}
