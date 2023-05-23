import readline from "readline";
import { Game } from "./memory-game.mjs";

function main() {
  var app = new CLIApp(["🚂", "🚀", "🚁", "🚜", "🚗", "🚕", "🚙", "🚌"]);
  app.run();
}

class CLIApp {
  #game;
  #reader;

  constructor(emojis) {
    this.#game = new Game(emojis);
    this.#reader = new InputReader();
  }

  async run() {
    console.log(this.toString());
    var name = await this.#reader.input("Enter your name: ");
    console.log("Hello, " + name + "!");
    this.#reader.close();
  }

  toString() {
    return (
      `Score: ${this.#game.player.score} \n` +
      this.#game.deck.cards
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

main();
