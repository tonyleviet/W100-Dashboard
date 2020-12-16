// import {ModuleWithProviders, NgModule} from '@angular/core';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FileManagerComponent } from "./file-manager.component";
import { FolderContentComponent } from "./components/folder-content/folder-content.component";
import { TreeComponent } from "./components/tree/tree.component";
import { NodeListerComponent } from "./components/tree/node-lister/node-lister.component";
import { NodeComponent } from "./components/functions/node/node.component";
import { MapToIterablePipe } from "./pipes/map-to-iterable.pipe";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { reducers } from "./reducers/reducer.factory";
import { LoadingOverlayComponent } from "./components/functions/loading-overlay/loading-overlay.component";
import { FileSizePipe } from "./pipes/file-size.pipe";
import { UploadComponent } from "./components/functions/upload/upload.component";
import { NewFolderComponent } from "./components/functions/upload/new-folder/new-folder.component";
import { SideViewComponent } from "./components/side-view/side-view.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { NgxSmartModalModule, NgxSmartModalService } from "ngx-smart-modal";
import { FileManagerRoutingModule } from "./file-manager-routing.module";
import { SampleFileManagerComponent } from './components/sample-file-manager/sample-file-manager.component';
import { PartialsModule } from '../../partials/partials.module';

@NgModule({
  imports: [
    NgxSmartModalModule.forChild(),
    HttpClientModule,
    StoreModule.forFeature("file-manager", reducers),
    CommonModule,
    PartialsModule
  ],
  providers: [NgxSmartModalService],
  declarations: [
    FileManagerComponent,
    FolderContentComponent,
    NodeComponent,
    TreeComponent,
    NodeListerComponent,
    MapToIterablePipe,
    NavBarComponent,
    LoadingOverlayComponent,
    FileSizePipe,
    UploadComponent,
    NewFolderComponent,
    SideViewComponent,
    NavigationComponent,
    SampleFileManagerComponent
  ],
  exports: [
    FileManagerComponent,
    LoadingOverlayComponent,
    SideViewComponent,
    FileManagerRoutingModule
  ]
})
export class FileManagerModule {}
