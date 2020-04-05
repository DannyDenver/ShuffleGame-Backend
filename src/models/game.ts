export class Game {
    constructor(spades: string[], diamonds: string[], hearts: string[], clubs: string[], timestamp: string) {
      this.spadesRow = spades;
      this.diamondsRow = diamonds;
      this.heartsRow = hearts;
      this.clubsRow = clubs;
      this.timestamp = timestamp;
    }
    
    timestamp: string;
    spadesRow: string[];
    diamondsRow: string[];
    heartsRow: string[];
    clubsRow: string[];
    inOrder: number;
    historicalInOrder: number;
    sequence: number;
  }