import { Injectable } from '@angular/core';
import { Settings } from './app.settings.model';

@Injectable()
export class AppSettings {
    public settings = new Settings(
        /**
         * theme name
         */
        'Annular',
        /**
         * loadingSpinner
         */
        true,
        /**
         * fixedHeader
         */
        true,
        /**
         * fixedSidenav
         */
        true,
        /**
         * fixedSidenavUserContent
         */
        false,
        /**
         * fixedFooter
         */
        false,
        /**
         * sidenavIsOpened
         */
        true,
        /**
         * sidenavIsPinned
         */
        true,
        /**
         * horizontal , vertical
         */
        'vertical',
        /**
         * default, compact, mini
         */
        'default',
        /**
         * indigo-light, teal-light, red-light,gray-light, blue-dark, green-dark, pink-dark, gray-dark
         */
        'indigo-light',
        /**
         * true = rtl, false = ltr
         */
        false
    );
}

