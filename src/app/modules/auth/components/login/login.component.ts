// Angular
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastService } from "@core-ui/views/components/toast/toast-service";

// RxJS
import { Observable, Subject } from "rxjs";
import { finalize, takeUntil, tap } from "rxjs/operators";
// Translate
import { TranslateService } from "@ngx-translate/core";
// Store
import { Store } from "@ngrx/store";
import { AppState } from "@core-ui/reducers";
// Auth
import { AuthNoticeService, AuthService, Login, UserAuthModel } from "@module/auth";
import { UserLoaded } from "@module/auth/_actions/auth.actions";
import { Credential } from '@module/auth/_services/credential.service';
import { AddLoadingAction, RemoveLoadingAction } from '@app/core-ui/_actions/loading.actions';

/**
 * ! Just example => Should be removed in development
 */
const DEMO_PARAMS = {
  EMAIL: "",
  PASSWORD: ""
};

@Component({
  selector: "kt-login",
  templateUrl: "./login.component.html",
  styleUrls: ['./login-component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {
  // Public params
  loginForm: FormGroup;
  loading = false;
  isLoggedIn$: Observable<boolean>;
  errors: any = [];
  hidePassword = true;

  private unsubscribe: Subject<any>;

  private returnUrl: any;

  // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  /**
   * Component constructor
   *
   * @param router: Router
   * @param auth: AuthService
   * @param authNoticeService: AuthNoticeService
   * @param translate: TranslateService
   * @param store: Store<AppState>
   * @param fb: FormBuilder
   * @param cdr
   * @param route
   */
  constructor(
    private router: Router,
    private auth: AuthService,
    private authNoticeService: AuthNoticeService,
    private translate: TranslateService,
    private store: Store<AppState>,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private credential: Credential
  ) {
    this.unsubscribe = new Subject();
  }

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit(): void {
    this.initLoginForm();

    // redirect back to the returnUrl before login
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params["returnUrl"] || "/";
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this.authNoticeService.setNotice(null);
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.loading = false;
  }

  /**
   * Form initalization
   * Default params, validators
   */
  initLoginForm() {
    // demo message to show
    if (!this.authNoticeService.onNoticeChanged$.getValue()) {
      const initialNotice = `Use account
			<strong>${DEMO_PARAMS.EMAIL}</strong> and password
			<strong>${DEMO_PARAMS.PASSWORD}</strong> to continue.`;
      // this.authNoticeService.setNotice(initialNotice, "info");

      this.authNoticeService.setNotice(null);
    }

    this.loginForm = this.fb.group({
      email: [
        DEMO_PARAMS.EMAIL,
        Validators.compose([
          Validators.required,
          // Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320) // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ])
      ],
      password: [
        DEMO_PARAMS.PASSWORD,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ])
      ]
    });
  }

  /**
   * Form Submit
   */
  submit() {
    const controls = this.loginForm.controls;
    /** check form */
    if (this.loginForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    this.loading = true;

    const authData = {
      email: controls["email"].value,
      password: controls["password"].value
    };

    // Set username to storage
    this.credential.setUserName(authData.email);

    this.auth
      .login(authData.email, authData.password)
      .pipe(
        tap((user: UserAuthModel) => {
          if (user && user.AccessToken) {
            // Update access token
            this.credential.setRsAccessToken(user.AccessToken);
            // Set userId to storage
            this.credential.setUserId(user.User.UserId);
            this.store.dispatch(new Login({ userName: authData.email, authToken: user.AccessToken }));
            this.store.dispatch(new UserLoaded({ user: user.User }));

            this.router.navigateByUrl(this.returnUrl); // Main page
          } else {
            if (user.Message) {
              if (user.FailCode === "Invalid_UserNamePassword") {
                this.authNoticeService.setNotice("Please enter a valid email and password!", "danger");
              } else {
                this.authNoticeService.setNotice(user.Message, "danger");
              }
            } else {
              this.authNoticeService.setNotice(
                this.translate.instant("AUTH.VALIDATION.INVALID_LOGIN"),
                "danger"
              );
            }
          }
        }),
        takeUntil(this.unsubscribe),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe(
        () => {},
        errData => {
           // Reload to refresh token
          const TK_ACTION_NAME = "[AUTH] Get Access Token";
          this.store.dispatch(new AddLoadingAction({ currentAction: TK_ACTION_NAME }));
          this.auth.getRsAccessToken().then(user => {
            this.store.dispatch(new RemoveLoadingAction({ currentAction: TK_ACTION_NAME }));
          });
          let msg = this.translate.instant("AUTH.VALIDATION.INVALID_LOGIN");

          if (errData.error && errData.error.Message) {
            msg = errData.error.Message;
          }

          this.toastService.show(msg, { classname: "bg-danger text-light" });
        }
      );
  }

  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.loginForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }
}
