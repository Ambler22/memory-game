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
  #deck;

  constructor(emojis) {
    this.player = new Player();
    this.#deck = new Deck(emojis);
    this.#deck.shuffle();
  }

  get isOver() {
    return this.#deck.cards.every((card) => card.isMatched);
  }

  get cards() {
    return this.#deck.cards;
  }

  choose(cardIndex) {
    this.#deck.cards[cardIndex].isFaceUp = true;
  }

  isValidCardIndex(index) {
    return !(
      Number.isNaN(index) ||
      index < 0 ||
      index >= this.#deck.cards.length ||
      this.#deck.cards[index].isFaceUp ||
      this.#deck.cards[index].isMatched
    );
  }

  yesOrNo(index1, index2) {
    if (this.#deck.cards[index1].emoji == this.#deck.cards[index2].emoji) {
      this.#deck.cards[index1].isMatched = true;
      this.#deck.cards[index2].isMatched = true;
    } else {
      this.#deck.cards[index1].isFaceUp = false;
      this.#deck.cards[index2].isFaceUp = false;
    }
  }
}
