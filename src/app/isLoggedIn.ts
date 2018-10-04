import {Injector} from 'angular2/core';
import {appInjector} from './appInjector';
import {Auth} from './Auth';
import {Router, ComponentInstruction} from 'angular2/router';

export const isLoggedIn = (next: ComponentInstruction, previous: ComponentInstruction) => {
    let injector: Injector = appInjector(); // get the stored reference to the injector
    let auth: Auth = injector.get(Auth);
    let router: Router = injector.get(Router);

  // return a boolean or a promise that resolves a boolean
    return new Promise((resolve) => {
      auth.check()
          .subscribe((result) => {
                    if (result) {
                        resolve(true);
                    } else {
                        router.navigate(['/Login']);
                        resolve(false);
                    }
                });
  });
};