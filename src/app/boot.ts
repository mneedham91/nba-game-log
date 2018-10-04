import { provide, ComponentRef } from 'angular2/core';
import { appInjector } from './app-injector';

bootstrap(AppComponent, [...]).then((appRef: ComponentRef) => {
  // store a reference to the application injector
  appInjector(appRef.injector);
});