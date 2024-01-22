import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Game } from '../../models/game';

@Component({
  selector: 'app-startscreen',
  standalone: true,
  imports: [],
  templateUrl: './startscreen.component.html',
  styleUrl: './startscreen.component.scss'
})

export class StartscreenComponent {
  firestore: Firestore = inject(Firestore);
  game!: Game;
  constructor(private router: Router) { }


  async startGame() {
    let game = new Game();
    await addDoc(this.getCollectionRef(), game.toJson()).then((gameInfo) =>
      this.router.navigateByUrl('/game/' + gameInfo.id));

  }

  getCollectionRef() {
    return collection(this.firestore, 'games');
  }

}
