import { CommonModule, registerLocaleData } from '@angular/common';
import { Component, LOCALE_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@environments/environment';
import localeIt from '@angular/common/locales/it';

if (environment.locale === 'it-IT') {
  registerLocaleData(localeIt);
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  providers: [{ provide: LOCALE_ID, useValue: environment.locale ?? 'en-US' }],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'it']);
    this.translate.setDefaultLang(environment.locale === 'it-IT' ? 'it' : 'en');
    this.translate.use(environment.locale === 'it-IT' ? 'it' : 'en');
  }
}
