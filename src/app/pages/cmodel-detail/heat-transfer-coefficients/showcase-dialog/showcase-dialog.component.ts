import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-showcase-dialog',
  templateUrl: 'showcase-dialog.component.html',
  styleUrls: ['showcase-dialog.component.scss'],
})
export class ShowcaseDialogComponent {

  @Input() title: string;
  @Input() rowData: any;

  selectedIndex: number = 1;
  setOptions: any[] = ['AG', 'BG', 'BIP', 'TIP'];

  constructor(protected ref: NbDialogRef<ShowcaseDialogComponent>) { }

  save() {
    if (this.selectedIndex) {
      this.ref.close(this.setOptions[this.selectedIndex - 1]);
    } else {
      this.ref.close();
    }
  }

  cancel() {
    this.ref.close();
  }
}
