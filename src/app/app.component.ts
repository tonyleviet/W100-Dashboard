import { Subscription } from "rxjs";
import { finalize, takeUntil, tap } from "rxjs/operators";

// Angular
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";

// Layout
import {
  LayoutConfigService,
  SplashScreenService,
  TranslationService
} from "@core-ui/_base/layout";

// language list
import { locale as enLang } from "@core-ui/_config/i18n/en";
import { AuthService } from "./modules/auth";

import { ToastService } from "@core-ui/views/components/toast/toast-service";
import { UnitedTempHttpClient } from './modules-services';

declare let gtag: Function;

@Component({
  selector: "body[kt-root]",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, OnDestroy {
  title = "DXP Workbench";
  loader: boolean;
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  /**
   * Component constructor
   *
   * @param translationService: TranslationService
   * @param router: Router
   * @param layoutConfigService: LayoutCongifService
   * @param splashScreenService: SplashScreenService
   */
  constructor(
    private translationService: TranslationService,
    private router: Router,
    private layoutConfigService: LayoutConfigService,
    private splashScreenService: SplashScreenService,
    private authService: AuthService,
    private toastService: ToastService,
    private unitedService: UnitedTempHttpClient
  ) {
    this.getRsAccessToken();
    this.unitedService.fetchUnitedAccessToken(); // TODO: Legacy - Should be removed in the future
    // register translations
    this.translationService.loadTranslations(enLang);


    const routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'UA-109142943-2', {
          'page_title': event.urlAfterRedirects,
          'page_path': event.urlAfterRedirects,
          'redirect_id': event.id
        });
      }
    });
    this.unsubscribe.push(routerSubscription);
  }

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit(): void {
    // enable/disable loader
    this.loader = this.layoutConfigService.getConfig("loader.enabled");

    const routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {

        // scroll to top on every route change
        window.scrollTo(0, 0);

        // to display back the body content
        setTimeout(() => {
          document.body.classList.add("kt-page--loaded");
        }, 500);
      }
    });

    this.unsubscribe.push(routerSubscription);
  }

  getRsAccessToken() {
    this.authService.getRsAccessToken().then(user => {
      // hide splash screen
      this.splashScreenService.hide();

      if (!user.AccessToken) {
        this.toastService.showDanger("Can't get access token. Please contact user admin for help!");
      }
    });
  }

  /**
   * On Destroy
   */
  ngOnDestroy() {
    this.unsubscribe.forEach(sb => sb.unsubscribe());
  }
}
