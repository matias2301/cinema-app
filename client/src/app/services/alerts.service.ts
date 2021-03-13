import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { AlertController, Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  desktop: boolean = false;
  targetAlert: string;

  constructor (
                private alertController: AlertController,
                private plt: Platform,
              ) {
                if(this.plt.width() > 389) {
                  this.desktop = true;                               
                  this.targetAlert = 'main';
                }
               }

    async alertModal(message, icon) {      
      await Swal.fire({
        // title: title,
        text: message,        
        icon: icon,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        target: this.desktop ? document.getElementById(this.targetAlert) : "body",
        heightAuto: false,
        width: 400,
        timer: 3500,
        confirmButtonText: 'Ok',
      });
    }

    async alertToast(message, icon) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        width: this.desktop ? 600 : 400,
        customClass: {
          container: this.desktop ? 'position-absolute' : null
        },
        target: this.desktop ? document.getElementById(this.targetAlert) : "body",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: icon,
        title: message
      })
    }

    // async formEdit( movie ) {
    //   const alert = await this.alertController.create({
    //     cssClass: 'alert-class',                
    //     header: 'Edit',
    //     inputs: [
    //       {
    //         name: 'title',
    //         type: 'text',
    //         value: movie.title
    //       },
    //       {
    //         name: 'overview',            
    //         type: 'textarea',
    //         attributes: {
    //           rows: 10,                      
    //         },            
    //         value: movie.overview
    //       },
    //       {
    //         name: 'release_date',
    //         type: 'date', 
    //         value: movie.release_date
    //       },
    //     ],
    //     buttons: [
    //       {
    //         text: 'Cancel',
    //         role: 'cancel',
    //         cssClass: 'secondary',
    //         handler: () => {
    //           console.log('Confirm Cancel');
    //         }
    //       }, {
    //         text: 'Ok',
    //         handler: () => {
    //           console.log('Confirm Ok');
    //         }
    //       }
    //     ]
    //   });  

    //   await alert.present();      
    // }
}
