// Game
// ----------
// properties
// -----------
// player: Player
// deck: Deck
// cards: Card[]
// -----------
// methods
// -----------
// start: () -> void

// Player
// ----------
// properties
// -----------
// score: number
// -----------
// methods
// -----------
// promptForCard: () -> Card

// Deck
// ----------
// properties
// -----------
// cards: Array<Card>
// -----------
// methods
// -----------
// shuffle: () -> void
// drawCard: () -> Card?

// Card
// ----------
// properties
// -----------
//  emoji: string
//  isMatched: boolean
//  isFaceUp: boolean

class Card {
  constructor(emoji) {
    this.emoji = emoji;
    this.isFaceUp = false;
    this.isMatched = false;
  }
}

class Deck {
  constructor(emojis) {
    this.cards = [];

    for (let emoji of emojis) {
      this.cards.push(new Card(emoji), new Card(emoji));
    }
  }

  shuffle() {
    for (let i = 0; i < 100; i++) {
      let randomIndex1 = Math.floor(Math.random() * this.cards.length);
      let randomIndex2;
      do {
        randomIndex2 = Math.floor(Math.random() * this.cards.length);
      } while (randomIndex1 == randomIndex2);
      let glass = this.cards[randomIndex1];
      this.cards[randomIndex1] = this.cards[randomIndex2];
      this.cards[randomIndex2] = glass;
    }
  }
}

class Player {
  constructor() {
    this.score = 0;
  }
}

export class Game {
  constructor(emojis) {
    this.player = new Player();
    this.deck = new Deck(emojis);
    this.deck.shuffle();
  }
}
