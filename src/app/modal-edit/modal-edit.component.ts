import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss'],
})
export class ModalEditComponent {

  @Input() title: string;
  @Input() description: string;
  @Input() price: number;
  @Input() quantity: number;
  @Input() status: boolean;


  constructor(public modalController: ModalController) {
   }

   dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  updateRoom() {}

}
