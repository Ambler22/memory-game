import readline from "readline";
import { Game } from "./memory-game.mjs";

class CLIApp {
  #game;
  #reader;

  constructor(emojis) {
    this.#game = new Game(emojis);
    this.#reader = new InputReader();
  }

  async run() {
    while (!this.#game.isOver) {
      this.#render();

      var cardIndex = await this.#getCardIndex("Choose first card: ");
      this.#game.choose(cardIndex);

      this.#render();

      var cardIndex2 = await this.#getCardIndex("Choose second card: ");
      this.#game.choose(cardIndex2);

      this.#render();

      this.#game.yesOrNo(cardIndex, cardIndex2);
    }
    console.log("Game over");
    this.#reader.close();
  }

  async #getCardIndex(prompt) {
    while (true) {
      let textInputFromUser = await this.#reader.input(prompt);
      let chosenCardIndex = parseInt(textInputFromUser, 10);

      if (this.#game.isValidCardIndex(chosenCardIndex)) {
        return chosenCardIndex;
      }

      console.log("Invalid card");
    }
  }

  #render() {
    console.log(
      `Score: ${this.#game.player.score} \n` +
        this.#game.cards
          .reduce((acc, card, index) => {
            // prettier-ignore
            var face = card.isMatched ? " " : (card.isFaceUp ? card.emoji : "X");
            var sep = (index + 1) % 4 == 0 ? "\n" : " ";
            return acc + face + sep;
          }, "")
          .trimEnd()
    );
  }
}

class InputReader {
  #readline;

  constructor() {
    this.#readline = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  async input(prompt) {
    return new Promise((resolve, reject) => {
      this.#readline.question(prompt, function onInput(text) {
        resolve(text);
      });
    });
  }

  close() {
    this.#readline.close();
  }
}

new CLIApp(["🚂", "🚀", "🚁", "🚜", "🚗", "🚕", "🚙", "🚌"]).run();
