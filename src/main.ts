import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import 'bootstrap/js/src/index';
import bsCustomFileInput from 'bs-custom-file-input';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import './libs/bs-btn-ripple';

import './libs/global-jquery';
import './libs/jquery-events-constants';
import './libs/jquery-ui-1.12.1.custom/jquery-ui';
import './libs/jquery-ui-make-controlgroup-rounded-pill';
import modals from './libs/modals';

modals.init({title: 'Recipe book'});
bsCustomFileInput.init();

if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
	.catch(err => console.error(err));
