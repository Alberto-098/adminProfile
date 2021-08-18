import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { hotel } from 'src/app/models/hotel.model';
import { HotelService } from 'src/app/services/hotel-service.service';
import { ModalEditComponent } from '../../modal-edit/modal-edit.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  public currentRoom;
  hotels : hotel[] = [];

  constructor(public modalController: ModalController,private hotelService: HotelService) { }

  ngOnInit() {
     this.getHotelsWithSnapshots();
  }

  getHotelsWithSnapshots(){
    this.hotelService.getHotels().subscribe( (hotelsSnapshot) =>{
      hotelsSnapshot.forEach((hotel) => {
        let hotelSnapshot = JSON.parse(JSON.stringify(hotel.payload));
        hotelSnapshot.id = hotel.payload.key;
        this.hotels.push(hotelSnapshot);
      });
    });   
  }

  async editModal(hotelId: string) {
    let  currentRoom = this.hotels.find( hotel => hotel.id == hotelId );
    const modal = await this.modalController.create({
      component: ModalEditComponent,
      componentProps: {
        'name': currentRoom.name,
        'description': currentRoom.description,
        'isActive': currentRoom.isActive,
        'pricePerNight': currentRoom.pricePerNight,
        'capacity': currentRoom.capacity,
        'image': currentRoom.image,
        'roomKey': currentRoom.id
      }
    });
    return await modal.present();
  }

}
