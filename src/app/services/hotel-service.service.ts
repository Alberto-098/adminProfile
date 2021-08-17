import { Injectable } from '@angular/core';
import { hotel } from '../models/hotel.model';
import { AngularFireDatabase} from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { room } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private hotels : hotel[] = [];

  constructor(private db: AngularFireDatabase ) { }

  /*getHotel(id: Number){
    return this.db.object('hotels/'+id).valueChanges();
    //return this.hotels.find(hotel => hotel.id == id);
  }*/

  addRoom(hotelKey, newRoom: room){
    this.db.list(`hotels/${hotelKey}/rooms/`).push(newRoom);
  }

  getHotels() {
    return this.db.list('hotels').snapshotChanges();
  }

  updateRoom(hotelId, roomId, updatedRoom: room){
    let roomKey;
    this.db.list(`hotels/${hotelId}/rooms/`, ref => ref.orderByChild('id').equalTo(roomId)).snapshotChanges().subscribe((room)=>{
      roomKey = room[0].payload.key;
      this.db.list(`hotels/${hotelId}/rooms/`).update(`${roomKey}`, updatedRoom);
    });
  }
}


