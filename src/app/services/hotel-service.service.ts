import { Injectable } from '@angular/core';
import { hotel } from '../models/hotel.model';
import { AngularFireDatabase} from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private db: AngularFireDatabase ) { }

  /*getHotel(id: Number){
    return this.db.object('hotels/'+id).valueChanges();
    //return this.hotels.find(hotel => hotel.id == id);
  }*/

  addRoom(newRoom){
    this.db.list(`hotels`).push(newRoom);
  }

  getHotels() {
    return this.db.list('hotels').snapshotChanges();
  }

  updateRoom(roomKey, updatedRoom){
    this.db.list(`hotels`).update(`${roomKey}`, updatedRoom);
  }
}


