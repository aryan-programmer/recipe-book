import "./libs/global-jquery";

import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import modals from "./libs/modals";

if (environment.production) {
	enableProdMode();
}

modals.init({
	title: "Recipe Book",
	size: 'xl',
	okButtonText: "Ok",
	cancelButtonText: "Cancel",
	bodyAsRawHtml: false,
});

platformBrowserDynamic().bootstrapModule(AppModule)
	.catch(err => console.error(err));
