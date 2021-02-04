import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-showcase-dialog',
  templateUrl: 'showcase-dialog.component.html',
  styleUrls: ['showcase-dialog.component.scss'],
})
export class ShowcaseDialogComponent {

  @Input() title: string;
  @Input() rowData: any;

  selectedIndex: number = 1;

  selectedIndexFormControl = new FormControl();

  setOptions: any[] = ['AG', 'BG', 'BIP', 'TIP']

  constructor(protected ref: NbDialogRef<ShowcaseDialogComponent>) { }

  save() {
    console.log('selectedIndex', this.selectedIndex)
    this.ref.close(this.setOptions[this.selectedIndex - 1]);
  }

  cancel() {
    this.ref.close()
  }
}
