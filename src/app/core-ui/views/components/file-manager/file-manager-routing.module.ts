import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SampleFileManagerComponent } from "./components/sample-file-manager/sample-file-manager.component";

const routes: Routes = [
  {
    path: "",
    children: [{ path: "", component: SampleFileManagerComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileManagerRoutingModule {}
