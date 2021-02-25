import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor (
                private alertController: AlertController, 
              ) { }

    async alertModal(message, icon) {
      await Swal.fire({
        // title: title,
        text: message,
        icon: icon,
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
        width: 400,
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