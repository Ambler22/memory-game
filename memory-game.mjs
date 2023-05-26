class Card {
  #isFaceUp;
  #isSeen;

  constructor(emoji) {
    this.emoji = emoji;
    this.isMatched = false;
    this.#isSeen = false;
    this.#isFaceUp = false;
  }

  get isSeen() {
    return this.#isSeen;
  }

  get isFaceUp() {
    return this.#isFaceUp;
  }

  set isFaceUp(newIsFaceUp) {
    if (this.#isFaceUp && !newIsFaceUp) {
      this.#isSeen = true;
    }
    this.#isFaceUp = newIsFaceUp;
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

  match() {
    this.score += 2;
  }

  noMatch() {
    if (this.score > 0) {
      this.score -= 1;
    }
  }
}

export class Game {
  #deck;

  constructor(emojis) {
    this.emojis = emojis;
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
    var firstCard = this.#deck.cards[index1];
    var secondCard = this.#deck.cards[index2];
    if (firstCard.emoji == secondCard.emoji) {
      firstCard.isMatched = true;
      secondCard.isMatched = true;
      this.player.match();
    } else {
      if (firstCard.isSeen || secondCard.isSeen) {
        this.player.noMatch();
      }
      firstCard.isFaceUp = false;
      secondCard.isFaceUp = false;
    }
  }
}
