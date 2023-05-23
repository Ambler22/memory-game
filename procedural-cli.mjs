// node js specific stuff to get input from terminal
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function input(prompt) {
  return new Promise(function exec(resolve, reject) {
    rl.question(prompt, function onInput(text) {
      resolve(text);
    });
  });
}

// model
var EMOJIS = ["🚂", "🚀", "🚁", "🚜", "🚗", "🚕", "🚙", "🚌"];

var cards = EMOJIS.flatMap((emoji) => [
  { emoji, isFaceUp: false, isMatched: false },
  { emoji, isFaceUp: false, isMatched: false },
]);

mixCards();

renderCards();

while (!cards.every((card) => card.isMatched)) {
  var chosenCardIndex = await promptCardIndex("first");
  cards[chosenCardIndex].isFaceUp = true;

  renderCards();

  var chosenCardIndex2 = await promptCardIndex("second");
  cards[chosenCardIndex2].isFaceUp = true;

  renderCards();

  if (cards[chosenCardIndex].emoji == cards[chosenCardIndex2].emoji) {
    cards[chosenCardIndex].isMatched = true;
    cards[chosenCardIndex2].isMatched = true;
  } else {
    cards[chosenCardIndex].isFaceUp = false;
    cards[chosenCardIndex2].isFaceUp = false;
  }
}

console.log("Game over");
rl.close();

async function promptCardIndex(cardNumber) {
  while (true) {
    let textInputFromUser = await input(`Choose ${cardNumber} card: `);
    let chosenCardIndex = parseInt(textInputFromUser, 10);

    if (isValidCardIndex(chosenCardIndex)) {
      return chosenCardIndex;
    }

    console.log("Invalid card");
  }

  function isValidCardIndex(index) {
    return !(
      Number.isNaN(index) ||
      index < 0 ||
      index >= cards.length ||
      cards[index].isFaceUp ||
      cards[index].isMatched
    );
  }
}

function renderCards() {
  console.log(
    cards
      .reduce((acc, card, index) => {
        // prettier-ignore
        var face = card.isMatched ? " " : (card.isFaceUp ? card.emoji : "X");
        var sep = (index + 1) % 4 == 0 ? "\n" : " ";
        return acc + face + sep;
      }, "")
      .trimEnd()
  );
}

function mixCards() {
  for (let i = 0; i < 100; i++) {
    let randomIndex1 = Math.floor(Math.random() * cards.length);
    let randomIndex2;
    do {
      randomIndex2 = Math.floor(Math.random() * cards.length);
    } while (randomIndex1 == randomIndex2);
    let glass = cards[randomIndex1];
    cards[randomIndex1] = cards[randomIndex2];
    cards[randomIndex2] = glass;
  }
}
