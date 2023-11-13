import axios from "axios";
import { Score } from "./types";
//pantryID 401834a3-d1fa-4cad-8395-0e134561dab9

export async function getSavedHighScores(): Promise<Score[]> {
  const response = await axios.get(
    "https://getpantry.cloud/apiv1/pantry/401834a3-d1fa-4cad-8395-0e134561dab9/basket/Score"
  );
  const highScores = response.data.scores;
  function removeDuplicateHighScores(): Score[] {
    return [{ word: "ear", numberOfMistakes: 0 }];
  }
  console.log(highScores);

  return highScores;
}

export async function saveHighScores(scores: Score[]) {
  const response = await axios.put(
    "https://getpantry.cloud/apiv1/pantry/401834a3-d1fa-4cad-8395-0e134561dab9/basket/Score",
    { scores }
  );
  const highScores = response.data.scores;
  return;
}

export async function getPokemonNames() {
  const response = await axios.get("https://pokeapi.co/api/v2/generation/1/");
  const generationOnePokemon: { name: string; url: string }[] =
    response.data.pokemon_species;
  const generationOnePokemonNames: string[] = generationOnePokemon.map(
    (pokemon) => {
      return pokemon.name;
    }
  );
  return generationOnePokemonNames;
}

export async function getPokemonMoves() {
  const response = await axios.get("https://pokeapi.co/api/v2/generation/1/");
  const generationOneMoves: { name: string; url: string }[] =
    response.data.moves;
  const generationOneMoveNames: string[] = generationOneMoves.map((move) => {
    return move.name;
  });
  return generationOneMoveNames;
}

export function getRandomWord(potentialWords: string[]): string {
  return potentialWords[Math.floor(Math.random() * potentialWords.length)];
}
export function getNumberOfMistakes(letters: string[], word: string) {
  const lettersNotInWord = letters.filter((letter) => {
    return !word.includes(letter);
  });

  return lettersNotInWord.length;
}

export const data = (highScoreArray: Score[], word: string) => {
  const wordAlreadyGuessed = highScoreArray.some((score) => {
    return score.word === word;
  });
  const numberOfMistakesFromExistingWord = highScoreArray.find((score) => {
    return score.word === word;
  })?.numberOfMistakes;
  const indexOfExistingWord = highScoreArray.findIndex((score) => {
    return score.word === word;
  });
  return {
    wordAlreadyGuessed,
    numberOfMistakesFromExistingWord,
    indexOfExistingWord,
  };
};

export function newHighScoreIsBest(
  numberOfMistakesFromExistingWord: number | undefined,
  numberOfMistakesfromCurrentWord: number
): boolean {
  if (numberOfMistakesFromExistingWord === undefined) {
    return true;
  }
  return numberOfMistakesfromCurrentWord < numberOfMistakesFromExistingWord;
}
