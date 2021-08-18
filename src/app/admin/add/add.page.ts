import { Component, Input, OnInit } from '@angular/core';
import { hotel } from 'src/app/models/hotel.model';
import { HotelService } from 'src/app/services/hotel-service.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  @Input() hotelKey: number;

  name: string;
  image: string;
  description: string;
  isActive: boolean = true;
  price: number;
  capacity: number;

  constructor(private hotelService: HotelService ) { }

  ngOnInit() {
  }

  add(){
    let newRoom : hotel = {
      id: Date.now() + "",
      image: this.image,
      name: this.name,
      description: this.description,
      isActive: this.isActive,
      pricePerNight: this.price,
      capacity: this.capacity
    }
    this.hotelService.addRoom(newRoom);
    location.href = "/admin/edit";
  }

  changeActiveStatus(event){
    this.isActive = event.target.value == 'active' ? true : false;
  }

}
