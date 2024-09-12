import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideHttpClient } from '@angular/common/http';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),provideHttpClient(), provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"app-web2-12a80","appId":"1:283447622164:web:6fbada679e0931276c4501","storageBucket":"app-web2-12a80.appspot.com","apiKey":"AIzaSyARUBXEkhLWl5ycxvUHzDas0RJkr5CB4qo","authDomain":"app-web2-12a80.firebaseapp.com","messagingSenderId":"283447622164","measurementId":"G-KZ8JP092HF"})), provideAuth(() => getAuth()), provideAnalytics(() => getAnalytics()), ScreenTrackingService, UserTrackingService, provideFirestore(() => getFirestore()), provideStorage(() => getStorage()), provideFirebaseApp(() => initializeApp({"projectId":"app-web2-12a80","appId":"1:283447622164:web:6fbada679e0931276c4501","storageBucket":"app-web2-12a80.appspot.com","apiKey":"AIzaSyARUBXEkhLWl5ycxvUHzDas0RJkr5CB4qo","authDomain":"app-web2-12a80.firebaseapp.com","messagingSenderId":"283447622164","measurementId":"G-KZ8JP092HF"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideStorage(() => getStorage()), provideAnimationsAsync()]
};
