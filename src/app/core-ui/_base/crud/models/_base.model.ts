export class BaseModel {
  Id: number;

  CreatedBy: string;
  CreatedDate: string;
  ModifiedBy: string;
  ModifiedDate: string;
}

export class PaginatorModel {
  pageSize: number;
  pageIndex: number;
  totalPage: number;
  totalRecord: number;

  constructor(data) {
    const { pageSize, pageIndex } = data;
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;
  }
}
