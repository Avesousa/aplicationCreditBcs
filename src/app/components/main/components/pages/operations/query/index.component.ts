import { Component, OnChanges } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'page-consulta',
  templateUrl: './index.component.html'
})
export class PageQueryComponent implements OnChanges{

  public month: string;
  public data: Params;
  public active: number = 1;
  public info: any;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((data: Params)=>{
      this.active = 1;
      this.month = data.month;
      this.data = data;
      this.createInfo();
    });
  }

  createInfo(){
    this.info = {
      from: this.data.from,
      to: this.data.to
    }
  }

  ngOnChanges(){
    this.createInfo();
  }

}
