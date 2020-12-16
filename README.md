# DXPAdmin

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.10.

## Document
[Sharepoint](https://gothinkretail.sharepoint.com/sites/RSInternalPortal/Shared%20Documents/Forms/AllItems.aspx?viewid=f023216e%2Dbb02%2D46f7%2D9214%2D8f48e1fbc652&id=%2Fsites%2FRSInternalPortal%2FShared%20Documents%2FOperations%2FProducts%2FNewAdmin)

## Theme
- Website: [Metronic - demo 9](https://keenthemes.com/metronic/preview/angular/demo9/)
- Source code: [Metronic-master.zip](https://gothinkretail.sharepoint.com/:u:/r/sites/RSInternalPortal/Shared%20Documents/Operations/Products/NewAdmin/Admin%20Theme/Metronic-master.zip?csf=1&e=R731OF)

# Layout Component
- Meterial: [Document](https://material.angular.io/components/categories)
- Bootstrap widgets: [Document](https://ng-bootstrap.github.io/#/getting-started)

## IIS Require: URL Rewrite https://www.iis.net/downloads/microsoft/url-rewrite

## Step 1: Install core and modules

Run: `make install_rs_module` -> install RelationShop module
Run: `make install_promotion_module` -> install Promotion module
Run: `make install_marketing_module` -> install Marketing module

or

Run: `make install_all_modules` -> install all DXP modules

### Window system
Must install [https://cygwin.com/install.html](https://cygwin.com/install.html) to run command "make".

**Note** 
In this step Select Package. Choose View "Full" and Search "make". Select package "make" and select new version on column "New".

## Step 2: Install Hotel

Go to package: https://www.npmjs.com/package/hotel

Run: `npm install -g hotel`

And run `make hotel` from root dir to setup.

## Step 3: Run dev

Run: `make dev_up`

*** Note: The official Node.js version that is supported is 10.9 or greater.

## Build production
on Windows
Build Dev : `npm run buid`
Build Staging : `npm run buid.stage`
Build Prod : `npm run buid.prod`

## Build environments:
Internal build:
- Dev sandbox: `ng build -c build.sandbox`
- Staging: `ng build -c build.staging`
- Production: `ng build -c production`

United Personalization build: (Legacy)
- Dev sandbox: `ng build -c build.dev.personalization`
- Staging: `ng build -c build.stage.personalization`
- Production: `ng build -c build.prod.personalization`

United build:
- Dev sandbox: `ng build -c build.sandbox.united`
- Staging: `ng build -c build.staging.united`
- UAT: `ng build -c build.uat.united`
- Production: `ng build -c build.prod.united`

## Run development environments:
Internal:
- Dev sandbox: `ng serve -c dev.sandbox`
- Staging: `ng serve -c dev.staging`
- Production: `ng serve -c production`

United Personalization: (Legacy)
- Dev sandbox: `ng serve -c dev.personalization`
- Staging: `ng serve -c dev.stage.personalization`
- Production: `ng serve -c dev.prod.personalization`

United:
- Dev sandbox: `ng serve -c dev.sandbox.united`
- Staging: `ng serve -c dev.staging.united`
- UAT: `ng serve -c dev.uat.united`
- Production: `ng serve -c dev.prod.united`


## Visual Studio Code

### Reference Tsconfig Paths

Install Extenssions: https://marketplace.visualstudio.com/items?itemName=rbbit.typescript-hero

### Editor Config

Install Extenssions: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig


## Theme

### Bootstrap widgets
https://ng-bootstrap.github.io/


*** Run `npm link @angular/cli` if the `ng` command not working

## Angular 

### Dev
- Working with Environment Stage
```bash
  ng serve -c stage
```
### Generate
- Module without component
```bash
ng generate module modules/name-of-module --route
```
- Module with component
```bash
ng generate module modules/name-of-module --route name-of-component --module app.module
```

- Component of module
```bash
ng generate component modules/name-of-module/name-of-component
```

### Code

#### Pipe
- Format money like 1.00
```bash
| money
```

- Format full datetime 'MM/DD/YYYY HH:mm'
```bash
| fullDatetime
```

- Format short dateime 'MM/DD/YYYY'
```bash
| shortDatetime
```

- Format Phone like (000) 000-0000
```bash
| phone
```

#### Input Mask
- Mask Money
```bash
<input type="text" matInput prefix="$ "
  [mask]='adminConfig.mask.money' [dropSpecialCharacters]="false"
  name="RegularPrice" [(ngModel)]="price.RegularPrice" #RegularPrice="ngModel"
  [required]="!model.IsDynamicSize" />
```

- Mask Number
```bash
<input type="text" matInput
  [mask]='adminConfig.mask.number' [dropSpecialCharacters]="false"
  name="VariantSize" [(ngModel)]="model.VariantSize" #RegularPrice="ngModel" />
```

- Mask Phone
```bash
<input type="tel" matInput placeholder="CellPhone" maxlength="20"
  [mask]='adminConfig.mask.phone' [showMaskTyped] = "true" [validation]="true"
  name="cellPhone" [(ngModel)]="model.CellPhone" #cellPhone="ngModel"/>
```

- Mask Zipcode
```bash
<input matInput type="tel" placeholder="Zip Code" maxlength="10" required
  [mask]='adminConfig.mask.zipCode' [showMaskTyped] = "true" [validation]="true"
  name="zipCode" [(ngModel)]="model.ZipCode" #zipCode="ngModel">
```
