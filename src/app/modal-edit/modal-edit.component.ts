import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { hotel } from '../models/hotel.model';
import { HotelService } from '../services/hotel-service.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss'],
})
export class ModalEditComponent implements OnInit {
  ionicForm: FormGroup;

  @Input() roomKey: string;

  @Input() name: string;
  @Input() description: string;
  @Input() image: string;
  @Input() isActive: boolean;
  @Input() pricePerNight: number;
  @Input() capacity: number;
  
  constructor(
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    public modalController: ModalController,
    private hotelService: HotelService ) {
   }

  ngOnInit(){
      this.ionicForm = this.formBuilder.group({
        name: [this.name, [Validators.required, Validators.minLength(2)]],
        image: [this.image, [Validators.required]],
        description: [this.description],
        pricePerNight: [this.pricePerNight, [Validators.required]],
        capacity: [this.capacity, [Validators.required]],
        status: [this.isActive ? 'active' : 'inactive', [Validators.required]]
    });
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true,
    });
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  updateRoom(roomKey) {
    if (this.ionicForm.valid) {
      let updatedRoom: hotel = {
        id: roomKey,
        description: this.description,
        name: this.ionicForm.controls.name.value,
        image: this.ionicForm.controls.image.value,
        pricePerNight: this.ionicForm.controls.pricePerNight.value,
        capacity: this.ionicForm.controls.capacity.value,
        isActive: this.ionicForm.controls.status.value == 'active'? true : false
      }
      this.hotelService.updateRoom(roomKey, updatedRoom);
      location.reload();
    }else{
      this.presentAlert()
    }
  }

  async presentAlert() {
    let message: string;
    if( this.errorControl.name.errors?.required || this.errorControl.name.errors?.minlength){
      message = "Name is required and min lenght of 2 characters";
    }else if(this.errorControl.image.errors?.required){
      message = "Image is required";
    }else if(this.errorControl.pricePerNight.errors?.required){
      message = "Price is required";
    }else if(this.errorControl.capacity.errors?.required){
      message = "Capacity is required";
    }

    const alert = await this.alertController.create({
      subHeader: 'Error submitting the form',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
