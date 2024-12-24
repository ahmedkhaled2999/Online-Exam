import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideServiceWorker } from '@angular/service-worker';
import { headerInterceptor } from './core/interceptor/headerinterceptor/header.interceptor';
import { loadingInterceptor } from './shared/interCeptor/loading/loading.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    
    provideRouter(routes, withViewTransitions()),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(
      withFetch(),
      withInterceptors([headerInterceptor, loadingInterceptor])
    ),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
