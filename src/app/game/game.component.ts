import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayerDialogComponent } from './../add-player-dialog/add-player-dialog.component';
import { GameRulesComponent } from './../game-rules/game-rules.component'



@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, AddPlayerDialogComponent, MatButtonModule, MatIconModule, GameRulesComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})


export class GameComponent {
  currentCard: string = '';
  result: string | undefined;
  pickCardAnimation = false;
  game!: Game;

  constructor(public dialog: MatDialog) {
    this.newGame();
  }



  newGame() {
    this.game = new Game();
    console.log(this.game);
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
