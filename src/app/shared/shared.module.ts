import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Moment
import { MomentModule } from "ngx-moment";
// Module Input mask
import { NgxMaskModule, IConfig } from "ngx-mask";

import { SHARED_PIPES } from "./pipes/index";
import { SHARED_DIRECTIVES } from "./directives/index";

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};
/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */
@NgModule({
  imports: [CommonModule, NgxMaskModule.forRoot(options)],
  declarations: [SHARED_PIPES, SHARED_DIRECTIVES],
  exports: [
    CommonModule,
    SHARED_PIPES,
    SHARED_DIRECTIVES,
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    NgxMaskModule,
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [SHARED_PIPES, CurrencyPipe],
    };
  }
}
