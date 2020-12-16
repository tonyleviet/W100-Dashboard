export class MenuItemsModel {
  id?: string;
  title: string;
  root?: boolean;
  bullet?: string;
  icon?: string;
  page?: string;
  submenu: MenuItemsModel[];
}
