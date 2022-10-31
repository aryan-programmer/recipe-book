import {Component, NgModule} from '@angular/core';

@Component({
	selector: 'blank-component',
	template: ''
})
export class BlankComponent {
}

@NgModule({
	declarations: [BlankComponent],
	exports: [BlankComponent],
})
export class BlankComponentModule {

}
