import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { hotel } from 'src/app/models/hotel.model';
import { HotelService } from 'src/app/services/hotel-service.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  ionicForm: FormGroup;

  @Input() hotelKey: number;

  name: string;
  image: string;
  description: string;
  isActive: boolean = true;
  price: number;
  capacity: number;

  constructor(public formBuilder: FormBuilder,
    public alertController: AlertController,
    private hotelService: HotelService ) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      image: ['', [Validators.required]],
      description: [''],
      pricePerNight: ['', [Validators.required]],
      capacity: ['', [Validators.required]],
      status: ['active', [Validators.required]]
    });
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  add(){
    if (this.ionicForm.valid) {
      let newRoom : hotel = {
        id: Date.now() + "",
        image: this.ionicForm.controls.image.value,
        name: this.ionicForm.controls.name.value,
        description: this.ionicForm.controls.description.value,
        pricePerNight: this.ionicForm.controls.pricePerNight.value,
        capacity: this.ionicForm.controls.capacity.value,
        isActive: this.ionicForm.controls.status.value == 'active'? true : false
      }
      this.hotelService.addRoom(newRoom);
      location.href = "/admin/edit";  
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
