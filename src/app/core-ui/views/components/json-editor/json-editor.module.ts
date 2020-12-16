import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CodemirrorModule } from "@ctrl/ngx-codemirror";
import { FormsModule } from "@angular/forms";
import { JsonEditorComponent } from "./json-editor.component";

@NgModule({
  declarations: [JsonEditorComponent],
	imports: [CommonModule, FormsModule, CodemirrorModule],
	exports: [JsonEditorComponent]
})
export class JsonEditorModule {}
