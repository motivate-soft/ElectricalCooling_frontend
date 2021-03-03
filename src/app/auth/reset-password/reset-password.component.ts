
import { NbResetPasswordComponent } from '@nebular/auth';

import { Component } from '@angular/core';

@Component({
    selector: 'ngx-reset-password',
    templateUrl: 'reset-password.component.html',
})

export class NgxResetPasswordComponent extends NbResetPasswordComponent {

    resetPass(): void {
        console.log('this.user', this.user);
        const userObj = this.user;
        this.user.new_password = userObj.password;
        this.user.confirm_password = userObj.confirmPassword;
        // delete this.user.password
        // delete this.user.confirmPassword
        super.resetPass();
    }
}
