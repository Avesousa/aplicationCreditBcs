import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'page-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class PageDashboardComponent implements OnInit {

  image:String = "/assets/images/bank.jpg";

  constructor() { }

  ngOnInit(): void {
  }

}
