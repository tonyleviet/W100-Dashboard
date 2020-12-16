import { Component, SimpleChanges } from "@angular/core";
import { TreeModel } from '../../models/tree.model';
import { NodeInterface } from '../../interfaces/node.interface';
import { ConfigInterface } from '../../interfaces/config.interface';

@Component({
  selector: "app-sample-file-manager",
  templateUrl: "./sample-file-manager.component.html",
  styleUrls: ["./sample-file-manager.component.scss"]
})
export class SampleFileManagerComponent {
  tree: TreeModel;
  node: NodeInterface;

  constructor() {
    const treeConfig: ConfigInterface = {
      baseURL: "http://localhost:8080/",
      api: {
        listFile: "api/list",
        uploadFile: "api/upload",
        downloadFile: "api/download",
        deleteFile: "api/remove",
        createFolder: "api/directory",
        renameFile: "api/rename",
        searchFiles: "api/search"
      },
      options: {
        allowFolderDownload: false,
        showFilesInsideTree: false
      }
    };

    this.tree = new TreeModel(treeConfig);
    this.node = this.tree.nodes;
  }
  // noinspection JSUnusedLocalSymbols
  itemSelected(event: any) {
    console.log(event);
  }
}
