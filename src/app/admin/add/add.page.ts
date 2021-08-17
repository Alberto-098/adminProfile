import { Component, Input, OnInit } from '@angular/core';
import { room } from 'src/app/models/room.model';
import { HotelService } from 'src/app/services/hotel-service.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  @Input() hotelKey: number;

  name: string;
  isActive: boolean = true;
  price: number;
  capacity: number;

  constructor(private hotelService: HotelService ) { }

  ngOnInit() {
  }

  add(){
    let newRoom: room = {
      id: Date.now(),
      name: this.name,
      isActive: this.isActive,
      pricePerNight: this.price,
      capacity: this.capacity
    }
    this.hotelService.addRoom(this.hotelKey, newRoom);
    location.reload();
  }

  changeActiveStatus(event){
    this.isActive = event.target.value == 'active' ? true : false;
  }

}
