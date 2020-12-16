export class AssetFileUploadModel {
  File: FormData;
  CompanyId: string;
  Type: string;
}

export class AssetFileUploadResultModel {
  Files: AssetFileModel[];
  Messages: string[];
  Status: number;
}
export class AssetFileModel {
  Id: number;
  OriginalFileName: string;
  CompanyId: string;
  FileData: null;
  ThumbnailPath: string;
  FilePath: string;
  Extension: string;
  FileType: string;
  Source: number;
  CloudUrl: string;
  CreatedBy: string;
  CreatedDate: string;
  ModifiedBy: string;
  ModifiedDate: string;
}

export enum FileType {
  product = "Product",
  store = "Store",
  service = "Service",
  option = "Option",
  offer = "Offer",
}
export const FILE_TYPE_OPTIONS: { [key: string]: string } = {
  [FileType.product]: "Product",
  [FileType.store]: "Store",
  [FileType.service]: "Service",
  [FileType.option]: "Option",
  [FileType.offer]: "Offer",
}
