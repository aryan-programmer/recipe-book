import {Injectable, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

@Injectable()
export class Unsubscriber implements OnDestroy {
	protected subscriptions?: Subscription[];

	ngOnDestroy (): void {
		if (this.subscriptions) {
			for (const subscription of this.subscriptions) {
				subscription.unsubscribe();
			}
		}
	}
}
