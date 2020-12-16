import { Component, OnInit, Injector } from '@angular/core';

import { SettingType, SettingService } from '../../services/setting.service';


@Component({
  selector: 'user-management-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  typeName = 'Setting';
  type: SettingType;

  arrayNumber: number[] = [1,2,3,4,5];

  constructor(
    injector: Injector,
    protected dataService: SettingService
  ) {
    this.type = new SettingType();
   }

  ngOnInit() {
    //super.ngOnInit();

    console.log('setting component');
  }

}
