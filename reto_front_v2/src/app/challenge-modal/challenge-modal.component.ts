import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ChallengeServiceService } from '../services/challenge-service.service';
import { Storage } from '@ionic/storage-angular'; 

@Component({
  selector: 'app-challenge-modal',
  templateUrl: './challenge-modal.component.html',
  styleUrls: ['./challenge-modal.component.scss'],
})
export class ChallengeModalComponent implements OnInit {

  category= "";
  challenge: any = [];
  score = 0;

  constructor(
    private modalCtrl: ModalController,
    private np: NavParams,
    private storage: Storage,
    private challengeService: ChallengeServiceService
  ) { 

  this.category = np.get('string')   
  this.getChallenge()    
  }

  ngOnInit() {}

  //Fonction qui récupère un challenge
  getChallenge(){
    if(this.category == 'random'){
      this.challengeService.getChallengeRandom().subscribe(data => {
        this.challenge = data[0].description
        this.score = data[0].score;
      })
      
    }else{
      this.challengeService.getChallenge(this.category).subscribe(data => {     
        this.challenge = data[0].description;
        this.score = data[0].score;
      });
    }
    
  }

  accepter(){    
    this.setDateChallenge();
    return this.modalCtrl.dismiss({
      'challenge': this.challenge,
      'category': this.category,
      'score': this.score
    });
  }

  dismiss(){
    return this.modalCtrl.dismiss({
      'challenge': null
    });
  }

  setDateChallenge(){
    const maDate = new Date();
    // 1 JOUR = 86400000
    this.storage.set('dateChallengeMillisecondes', maDate.getTime());    
  }

}
