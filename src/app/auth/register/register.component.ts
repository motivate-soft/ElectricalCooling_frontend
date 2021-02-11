import { Component, OnInit } from '@angular/core';
import { NbRegisterComponent } from '@nebular/auth';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class NgxRegisterComponent extends NbRegisterComponent {

  register(): void {
    const userObj = this.user
    this.user.first_name = userObj.firstName
    this.user.last_name = userObj.lastName
    delete this.user.firstName
    delete this.user.lastName
    super.register()
  }
}
