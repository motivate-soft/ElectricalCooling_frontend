import { Injectable } from '@angular/core';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Injectable()
export class NgxToastrService extends NbToastrService {
    config = {
        destroyByClick: true,
        duration: 5000,
        hasIcon: true,
        position: NbGlobalPhysicalPosition.TOP_RIGHT,
        preventDuplicates: false,
    };

    types: NbComponentStatus[] = [
        'primary',
        'success',
        'info',
        'warning',
        'danger',
    ];

    showToast(type: NbComponentStatus, title: string = '', body: string = '') {
        const config = {
            status: type,
            destroyByClick: true,
            duration: 5000,
            hasIcon: true,
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
            preventDuplicates: false,
        };

        this.show(body, title, config);
    }
}
