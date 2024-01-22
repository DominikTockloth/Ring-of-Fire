import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayerDialogComponent } from './../add-player-dialog/add-player-dialog.component';
import { GameRulesComponent } from './../game-rules/game-rules.component'
import { Firestore, collection, onSnapshot, doc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { PlayerMobileComponent } from '../player-mobile/player-mobile.component';




@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, AddPlayerDialogComponent, MatButtonModule, MatIconModule, GameRulesComponent ,PlayerMobileComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})


export class GameComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  firestore: Firestore = inject(Firestore);
  result: string | undefined;
  game!: Game;
  gameId: string = '';
  unsubGames;

  constructor(public dialog: MatDialog) {
    this.unsubGames = this.getGamesList();
    this.newGame();
    this.route.params.subscribe((params) => {
      params['id'];
      this.gameId = params['id'];
    });
  }


  /** Cleanup function to unsubscribe from Firebase snapshot listener. */
  ngOnDestroy() {
    this.unsubGames();
  }

  /** Initialize a new game. */
  newGame() {
    this.game = new Game();
  }

  /** Save the current game state to Firebase. */
  saveGame() {
    let collectionRef = collection(this.firestore, 'games');
    if (this.gameId) {
      const gameDocRef = doc(collectionRef, this.gameId);
      updateDoc(gameDocRef, this.game.toJson());
    }
  }

  /** Retrieve the list of games from Firebase. */
  getGamesList() {
    return onSnapshot(this.getCollectionRef(), (list) => {
      list.forEach(element => {
        console.log(element.id);
      });
    });
  }

  /** Get a reference to the game collection. */
  getCollectionRef() {
    return collection(this.firestore, 'games');
  }

  /**
   * Get a reference to a specific document in the collection.
   * @param colId - Collection ID.
   * @param docId - Document ID.
   * @returns Document reference.
   */
  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

  /** Simulate taking a card in the game. */
  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.cardStack.pop()!;
      console.log(this.game.currentCard);
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1500);
    }
  }

  /** Open the add player dialog. */
  openDialog(): void {
    const dialogRef = this.dialog.open(AddPlayerDialogComponent, {});
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  };
}












