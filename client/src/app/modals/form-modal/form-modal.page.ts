import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { NavParams, ModalController, Platform } from '@ionic/angular';

import { FavouritesService } from '../../services/favourites.service';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.page.html',
  styleUrls: ['./form-modal.page.scss'],
})
export class FormModalPage implements OnInit {

  validations_form: FormGroup;
  fileToUpload: File = null;
  rating: string = '6';
  previousUrl: any;
  desktop: boolean = false;

  @Input() id: number;
  @Input() title: string;
  @Input() overview: string;
  @Input() release_date: Date;
  @Input() add: boolean;  

  constructor (
                public navParams: NavParams,
                public modalCtrl: ModalController,
                private favouritesService: FavouritesService,                
                private alertsService: AlertsService,
                public formBuilder: FormBuilder,
                private plt: Platform,
              ) { 
                if(this.plt.width() > 389) this.desktop = true;               
                this.createForm();                
              }

  ngOnInit() {
    this.loadForm();
  }

  get title_valid() {
    return this.validations_form.get('title').invalid && (this.validations_form.get('title').dirty || this.validations_form.get('title').touched);
  }

  createForm() {

    this.validations_form = this.formBuilder.group({
      title: new FormControl('',  Validators.compose([Validators.required])),
      overview: new FormControl(''),
      release_date: new FormControl(''),      
    });
  }

  loadForm() {

    this.validations_form.reset({
      title: this.title || '',
      overview: this.overview || '',
      release_date: this.release_date || new Date().toISOString()      
    });
  }

  onSubmitEdit(values){ 

    if( this.validations_form.invalid ){
      Object.values( this.validations_form.controls ).forEach( control => {
        control.markAsTouched();
      });
    } else {      
      this.favouritesService.updateFavourite(this.id, values)
        .subscribe( res => {          
          this.alertsService.alertToast('Movie Updated Successfully', 'success')
            .then(() => this.closeModal(values));

        }, (err) => {
          this.alertsService.alertToast('Something went wrong', 'error');
        });
    }
  }

  onSubmitAdd(values){ 

    if( this.validations_form.invalid ){
      Object.values( this.validations_form.controls ).forEach( control => {
        control.markAsTouched();
      });
    } else {

      let fav: any = {
        title: values.title,
        overview: values.overview,
        vote_average: this.rating,
        release_date: values.release_date             
      }

      if(this.fileToUpload) {
        this.favouritesService.uploadFile(this.fileToUpload)
          .subscribe( res => {            
            if(res.file) {
              fav = {
                ...fav,                
                backdrop_path: res.file
              }             
              
              this.callAddService(fav, values);
            }
          }, (err) => {
            console.log(err);
          });          
      } else {
        this.callAddService(fav, values);       
      }
    }
  }

  callAddService(fav, values) {
    this.favouritesService.addFavourite(fav)
    .subscribe( res => {                  
      this.alertsService.alertToast(res.msg, 'success')
        .then(() => {
          values._id = res.favourite._id;
          values.backdrop_path = res.favourite.backdrop_path;
          values.vote_average = this.rating;          
          this.closeModal(values)
        });
    }, (err) => {
      this.alertsService.alertToast('Something went wrong', 'error');
    });
  }

  onFileChange(e){

    if (e.target.files.length > 0) {
      this.fileToUpload = e.target.files[0];
      var reader = new FileReader();   
  
      reader.onload = (event: any) => {
        this.previousUrl = event.target.result;        
      }    
      
      reader.readAsDataURL(this.fileToUpload);
    }
  }


  async closeModal(values) {
    await this.modalCtrl.dismiss(values);
  }

  onRatingChange(rating: string){
    let ratingNum = Number(rating);
    this.rating = (ratingNum * 2).toString();
  }
}
