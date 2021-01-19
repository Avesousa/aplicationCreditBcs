import { Component, OnInit } from '@angular/core';
import { Period } from 'src/app/components/main/models/period.model';
import { LayoutService } from '../../../../services/layout.service';

@Component({
  selector: 'layout-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  private showSubItem1: boolean;
  private showItemList: number[];
  public lastPeriod: Period[];

  constructor(public _layoutService: LayoutService) {}

  ngOnInit(): void {
    this.showItemList = [];
    this.getLastMonths();
    
  }

  getLastMonths(){
    this._layoutService.getLastMonths().subscribe((data)=>{
      this.lastPeriod = data;
      console.log(this.lastPeriod);
    }, (error)=>{
      console.log(error);
    });
  }

  toggleNav(id: number) {
    let index = this.showItemList.indexOf(id);
    if (index === -1) {
      this.showItemList.push(id);
    } else {
      this.showItemList.splice(index,1);
    }
  }

  isOpen(id: number) {
    return this.showItemList.indexOf(id) !== -1;
  }
}
