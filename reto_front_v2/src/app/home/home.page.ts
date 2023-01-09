import { Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { CategorieModalComponent } from '../categorie-modal/categorie-modal.component';
import { ChallengeModalComponent } from '../challenge-modal/challenge-modal.component';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  categories = ['sport', 'sante', 'creativite', 'random'];
  canDismiss = false;
  category = "";
  challenge = "";
  end = false;
  score = 0;
  nbrChallenge = 0;
  challengeScore = 0;
  titre ="";
  objectif= 0;

  constructor(
    private modalCtrl: ModalController,
    private storage: Storage,
    private toastController: ToastController,
    private route: Router
  ) {
    this.storage.create();
    this.storage.get('challenge').then(chall => {
      this.storage.get('end').then((value => {
        if(value == null){
          this.end = true;
        }else{
          if (value == false) {
            this.challenge = chall;
          } else {          
            this.challenge = 'null';
          }
          this.end = value
        }
        
      }))
    })
    this.storage.get('category').then(value => {
      this.category = value;
      this.category = this.category.toUpperCase();
    })
    this.storage.get('score').then(value => {      
      if (value == null) {
        this.score = 0;
        this.storage.set('score', 0);
      } else {
        this.score = value;
      }
    })
    this.storage.get('nbrChallenge').then(value => {
      if (value == null) {
        this.nbrChallenge = 0;
        this.storage.set('nbrChallenge', 0);
        this.selectTitle(this.nbrChallenge);
      } else {
        this.selectTitle(value);
        this.nbrChallenge = value;
      }
    })
    this.storage.get('challengeScore').then((value=> {
      this.challengeScore = value;
    }))
  }

  selectTitle(value: number){
    console.log(value + "hello");
    
    if(value < 10){
      this.titre = "Nouveau Retador";
      this.objectif = 10;
    }
    if(value >= 10 && value < 25){
      this.titre = "Retador confirmé";
      this.objectif = 25;
    }
    if(value >= 25 && value < 45){
      this.titre = "Retador d'élite";
      this.objectif = 45;
    }
    if(value >= 45 && value < 75){
      this.titre = "Maître Retador";
      this.objectif = 75;
    }
    if(value >= 75 ){
      this.titre = "Retador ultime";
      this.objectif = 365;
    }
  }

  dismiss() {

  }

  async openCategoryModal() {
      this.storage.get('dateChallengeMillisecondes').then((async oldDate => {
        let newDate = new Date().getTime();
        
        // if (newDate - oldDate >= 86400000 || oldDate == null) {          
          if (this.end == true) {
            const modal = await this.modalCtrl.create({
              component: CategorieModalComponent,
              cssClass: 'category-modal'
            });

            modal.onDidDismiss().then((data) => {
              if (this.category != 'null') {
                this.challengeModal(data.data.category);
              }
            });

            modal.present();
          }
        // }
      }))
  }

  async challengeModal(str: string) {
    const modal2 = await this.modalCtrl.create({
      component: ChallengeModalComponent,
      cssClass: 'challenge-modal',
      componentProps: {
        string: str,
      },
    });

    modal2.onDidDismiss().then((data) => {
      if (data.data.challenge != null) {

        this.challenge = data.data.challenge;
        this.storage.set('challenge', data.data.challenge);
        this.storage.set('end', false);
        this.challengeScore = data.data.score;
        this.storage.set('scorePoints', this.challengeScore);
        this.category = data.data.category;

        this.storage.set('category', this.category);
        this.category = data.data.category;

        if (this.end == true) {
          this.end = false;
        }
      }
    })

    modal2.present();
  }


  async endChall() {
    this.storage.get('end').then((async value => {
      if (value != true) {
        this.storage.set('end', true);
        this.category = ""
        this.end = true;
        this.score = this.score + this.challengeScore;
        this.storage.set('score', this.score);
        this.nbrChallenge++;
        this.storage.set('nbrChallenge', this.nbrChallenge);

        const toast = await this.toastController.create({
          message: 'Défi accompli, BRAVO !',
          duration: 3000,
          cssClass: 'custom-toast',
          buttons: [
            {
              text: 'Dismiss',
              role: 'cancel'
            }
          ],
        });

        await toast.present();
      }
    }))

  }

  goToSettings(){
    this.route.navigate(['/settings']);
  }

}
