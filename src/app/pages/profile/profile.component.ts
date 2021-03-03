import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NgxToastrService } from '../../@core/service/toast.service';
import { UserService } from '../../@core/service/users.service';
import { User } from './../../@core/data/users';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
})

export class ProfileComponent implements OnInit {
    loading: Boolean = false;
    submitted: Boolean = false;

    profileForm: FormGroup;
    passwordForm: FormGroup;
    profileFormSubmitted = false;
    passwordFormSubmitted = false;

    currentPassword = '';
    newPassword = '';
    repeatPassword = '';

    user = {
        firstName: '',
        lastName: '',
        email: '',
    };

    constructor(
        private userService: UserService,
        private authService: NbAuthService,
        private formBuilder: FormBuilder,
        private toastrService: NgxToastrService,

    ) {
        this.authService.onTokenChange()
            .subscribe((token: NbAuthJWTToken) => {
                if (token.isValid()) {
                    const user = token.getPayload();

                    this.user = {
                        firstName: user.first_name,
                        lastName: user.last_name,
                        email: user.email,
                    };
                    this.getProfile();
                }
            });

    }

    ngOnInit() {
        this.profileForm = this.formBuilder.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required]],
        });

        /**
         *  Formgroup Validator Approach
         */
        // this.passwordForm = this.formBuilder.group({
        //     currentPassword: ['', [Validators.required]],
        //     newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
        //     repeatPassword: ['', [Validators.required]]
        // }, { validator: this.checkPasswordMatch });

        /**
         * Formcontrol validator approach
         */
        this.passwordForm = new FormGroup({});
        this.passwordForm.addControl('currentPassword', new FormControl('', [Validators.required]));
        this.passwordForm.addControl('newPassword', new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]));
        this.passwordForm.addControl('repeatPassword', new FormControl(
            '', [Validators.compose(
                [Validators.required, this.validatePasswordMatch.bind(this)],
            )],
        ));
    }

    get pf() {
        return this.profileForm.controls;
    }

    get cp() {
        return this.passwordForm.controls;
    }

    checkPasswordMatch(frm: FormGroup) {
        console.log('frm', frm);
        return frm.get('newPassword').value === frm.get('repeatPassword').value
            ? null : { 'mismatch': true };
    }

    validatePasswordMatch(fieldControl: FormControl) {
        return fieldControl.value === this.passwordForm.get('newPassword').value ? null : {
            mismatch: true,
        };
    }

    saveProfile() {
        this.updateProfile();
        // if (!this.loading) {
        //     this.profileFormSubmitted = true;
        //     if (this.profileForm.invalid) {
        //         return;
        //     }
        //     this.updateProfile();
        // } else {
        //     this.loading = true;
        // }
    }

    getProfile() {
        this.userService.getUser().subscribe(value => console.log('getProfile', value));
    }

    updateProfile() {
        // this.loaderService.display(true);
        const userObj: User = {
            first_name: this.user.firstName,
            last_name: this.user.lastName,
            email: this.user.email,
        };
        this.userService.updateUser(userObj).subscribe(
            data => {
                this.toastrService.showToast('success', 'Success', 'Profile has been changed!');
            },
            error => {
                if (error) {
                    this.toastrService.showToast('warning', 'Oops', 'Invalid fields!');
                }
            },
        );
    }

    setPassword() {
        const authObj = {
            current_password: this.currentPassword,
            new_password: this.newPassword,
        };

        this.userService.setPassword(authObj).subscribe(
            data => {
                this.toastrService.showToast('success', 'Success', 'Password has been changed!');
            },
            error => {
                if (error.current_password) {
                    this.toastrService.showToast('warning', 'Oops', 'Your password is incorrect!');
                }
                if (error.new_password) {
                    this.toastrService.showToast('warning', 'Oops', error.new_password[0]);
                }
            },
        );
    }

    cancelResetPassword() {
        this.currentPassword = '';
        this.newPassword = '';
        this.repeatPassword = '';
    }
}
