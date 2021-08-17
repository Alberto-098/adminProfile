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
        hotelSnapshot.rooms = Object.values(hotelSnapshot.rooms);
        this.hotels.push(hotelSnapshot);
      });
    });   
  }

  // editModal recibe un parametro que es el item seleccionado de la lista de habitaciones. por ejemplo: item
  async editModal(hotelId: number) {
    let  currentHotel = this.hotels.find( hotel => hotel.id == hotelId );
    const modal = await this.modalController.create({
      component: ModalEditComponent,
      componentProps: {
        'rooms': currentHotel.rooms,
        'hotelId': hotelId
      }
    });
    return await modal.present();
  }

}
