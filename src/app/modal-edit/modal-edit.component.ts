import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { hotel } from '../models/hotel.model';
import { HotelService } from '../services/hotel-service.service';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss'],
})
export class ModalEditComponent {

  @Input() roomKey: string;

  @Input() name: string;
  @Input() description: string;
  @Input() image: string;
  @Input() isActive: boolean;
  @Input() pricePerNight: number;
  @Input() capacity: number;
  
  constructor(public modalController: ModalController, private hotelService: HotelService ) {
   }

   dismiss() {
    this.modalController.dismiss({
      'dismissed': true,
    });
  }

  changeActiveStatus(event){
    this.isActive = event.target.value == 'active' ? true : false;
  }

  updateRoom(roomKey) {
    let updatedRoom: hotel = {
      id: roomKey,
      description: this.description,
      name: this.name,
      image: this.image,
      pricePerNight: this.pricePerNight,
      capacity: this.capacity,
      isActive: this.isActive
    }
    this.hotelService.updateRoom(roomKey, updatedRoom);
    location.reload();
  }

}
