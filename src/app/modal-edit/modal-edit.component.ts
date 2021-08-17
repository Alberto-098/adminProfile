import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddPage } from '../admin/add/add.page';
import { room } from '../models/room.model';
import { HotelService } from '../services/hotel-service.service';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss'],
})
export class ModalEditComponent {


  @Input() rooms: Array<room>;
  @Input() hotelId: number;
  @Input() roomId: number;
  @Input() isRoomSelected: boolean = false;

  @Input() name: string;
  @Input() isActive: boolean;
  @Input() price: number;
  @Input() capacity: number;
  
  constructor(public modalController: ModalController, private hotelService: HotelService ) {
   }

   dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true,
    });
  }

  changeActiveStatus(event){
    this.isActive = event.target.value == 'active' ? true : false;
  }

  async addNewRoom(){
    this.dismiss();
    const modal = await this.modalController.create({
      component: AddPage,
      componentProps: {
        'isRoomSelected': true,
      }
    });
    return await modal.present();
  }

  updateRoom(hotelId, roomId) {
    let updatedRoom:room = {
      id: roomId,
      name: this.name,
      pricePerNight: this.price,
      capacity: this.capacity,
      isActive: this.isActive
    }
    this.hotelService.updateRoom(hotelId, roomId, updatedRoom);
    location.reload()
  }

  async editRoom(room: room) {
    this.dismiss();
    const modal = await this.modalController.create({
      component: ModalEditComponent,
      componentProps: {
        'isRoomSelected': true,
        'roomId': room.id,
        'hotelId': this.hotelId,
        'name': room.name,
        'isActive': room.isActive,
        'price': room.pricePerNight,
        'capacity': room.capacity
      }
    });
    return await modal.present();
  }

}
