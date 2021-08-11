import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalEditComponent } from '../../modal-edit/modal-edit.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  public currentRoom;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    
  }

 

  // editModal recibe un parametro que es el item seleccionado de la lista de habitaciones. por ejemplo: item
  async editModal() {
    let item = {
      title: "Habitacion Deluxe",
      description: "De lo mas fino para tus vacaciones. Mansion",
      price: 1200,
      quantity: 12,
      status: true
    }
    // comentar este objeto quemado una vez que ya tenga la parte programada
    const modal = await this.modalController.create({
      component: ModalEditComponent,
      componentProps: {
        'title': item.title,
        'description': item.description,
        'price': item.price,
        'quantity': item.quantity,
        'status': item.status
      }
    });
    return await modal.present();
  }

}
