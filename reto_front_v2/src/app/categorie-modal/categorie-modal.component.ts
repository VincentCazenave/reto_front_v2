import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChallengeModalComponent } from '../challenge-modal/challenge-modal.component';

@Component({
  selector: 'app-categorie-modal',
  templateUrl: './categorie-modal.component.html',
  styleUrls: ['./categorie-modal.component.scss'],
})
export class CategorieModalComponent implements OnInit {

  categories = ['sport', 'sante', 'creativite', 'random'];

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  dismiss(str: string){
    return this.modalCtrl.dismiss({
      category: str
    });
  }

  getChallenge(str: string){
    this.dismiss(str);
  }
}
