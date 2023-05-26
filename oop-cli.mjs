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
    var shouldRestart = true;
    while (shouldRestart) {
      while (!this.#game.isOver) {
        this.#render();

        let cardIndex = await this.#getCardIndex("Choose first card: ");
        this.#game.choose(cardIndex);

        this.#render();

        let cardIndex2 = await this.#getCardIndex("Choose second card: ");
        this.#game.choose(cardIndex2);

        this.#render();

        this.#game.yesOrNo(cardIndex, cardIndex2);
      }

      console.log("Game over");

      let answer = (
        await this.#reader.input("Do you want to restart? (y/n) ")
      ).toLowerCase();

      if (answer == "yes" || answer == "y") {
        this.#game = new Game(this.#game.emojis);
      } else {
        shouldRestart = false;
        this.#reader.close();
      }
    }
    console.log("Thanks for playing!");
  }

  async #getCardIndex(prompt) {
    while (true) {
      let textInputFromUser = await this.#reader.input(prompt);
      let chosenCardIndex = parseInt(textInputFromUser, 10) - 1; // allow 1 based indices for user

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

new CLIApp(["🚂", "🚀" /* "🚁", "🚜", "🚗", "🚕", "🚙", "🚌" */]).run();
