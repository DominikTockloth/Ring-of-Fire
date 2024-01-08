export class Game {
    public players: string[] = [];
    public currentPlayer: number = 0;
    public playedCards: string[] = [];
    public cardStack: string[] = [];

    constructor() {
        for (let i = 1 ; i < 14; i++) {
            this.cardStack.push('ace_' + i);
            this.cardStack.push('clubs_' + i);
            this.cardStack.push('hearts_' + i);
            this.cardStack.push('diamonds_' + i);
        }
        shuffleArray(this.cardStack)
    }
}

function shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }