import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { providePrimeNG } from 'primeng/config';

import Aura from '@primeng/themes/aura';
import { routes } from '@app/app.routes';
import { appReducer } from '@app/store/app.reducer';
import { AppEffects } from '@app/store/app.effects';
import { initialState } from '@app/store/app.state';
import { environment } from '@environments/production.environments';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    provideHttpClient(),
    provideStore(
      {
        feature: appReducer,
      },
      {
        initialState: {
          feature: initialState,
        },
      },
    ),
    provideEffects([AppEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !environment.production,
    }),
  ],
};
