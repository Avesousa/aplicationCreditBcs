import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/components/auth/models/user.model';
import { UserService } from 'src/app/components/auth/services/user.service';
import { LayoutService } from '../../../../services/layout.service';

@Component({
  selector: 'layout-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  logo:String = "/assets/images/logo.svg";

  constructor(public layoutService: LayoutService, public userService: UserService, public cookieService: CookieService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.userService.logout().subscribe((res: any) => {
      console.log(res);
      if (res) {
        let user: User = { ...res.data };
        this.cookieService.set('USER_DATA', JSON.stringify(user));
      }
    });
  }

}
