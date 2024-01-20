import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayerDialogComponent } from './../add-player-dialog/add-player-dialog.component';
import { GameRulesComponent } from './../game-rules/game-rules.component'
import { Firestore, collection, onSnapshot, addDoc, doc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, AddPlayerDialogComponent, MatButtonModule, MatIconModule, GameRulesComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})


export class GameComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  firestore: Firestore = inject(Firestore);

  currentCard: string = '';
  result: string | undefined;
  pickCardAnimation = false;
  game!: Game;
  unsubGames;

  constructor(public dialog: MatDialog) {
    this.unsubGames = this.getGamesList();
    this.newGame();
    this.route.params.subscribe((params) => {
      params['id'];
    })
    

  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.unsubGames();
  }

  newGame() {
    this.game = new Game();
    // this.addGame(this.game);

  }
/*
  async addGame(game:{}) {
    try {
      const docRef = await 
      console.log('Dokument erfolgreich hinzugefügt mit der ID:', docRef.id);
    } catch (error) {
      console.error('Fehler beim Hinzufügen des Dokuments:', error);
    }
  }
*/

  getGamesList() {
    return onSnapshot(this.getCollectionRef(), (list) => {
      list.forEach(element => {
        console.log(element.id);
      });
    })
  }



  getCollectionRef() {
    return collection(this.firestore, 'games');
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }


  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.cardStack.pop()!;  // exclamation mark (!) to inform that the string is definetely not null or undefined
      console.log(this.currentCard);
      this.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length; // modulo operator

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1500)
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPlayerDialogComponent, {
    });
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  };
}
