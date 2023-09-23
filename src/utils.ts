import axios from "axios";
import { Score } from "./types";
//pantryID 401834a3-d1fa-4cad-8395-0e134561dab9

export async function getSavedHighScores() {
  const response = await axios.get(
    "https://getpantry.cloud/apiv1/pantry/401834a3-d1fa-4cad-8395-0e134561dab9/basket/Score"
  );
  const highScores: Score[] = response.data.scores;
  console.log(highScores);
  return highScores;
}
console.log(getSavedHighScores());

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

export function isWordAlreadyGuessed(
  highScoreArray: Score[],
  word: string
): boolean {
  return highScoreArray.some((score) => {
    return score.word === word;
  });
}

export function getNumberOfMistakesFromExistingWord(
  highScoreArray: Score[],
  word: string
): number {
  let mistakes = 0;
  highScoreArray.forEach((score) => {
    if (score.word === word) {
      mistakes += score.numberOfMistakes;
    }
  });
  return mistakes;
}

export function newHighScoreIsBetter(
  numberOfMistakesFromExistingWord: number,
  numberOfMistakesfromCurrentWord: number
): boolean {
  return numberOfMistakesfromCurrentWord < numberOfMistakesFromExistingWord;
}

export function getIndexOfExistingWord(highScoreArray: Score[], word: string) {
  let indexOfExistingWord = 0;
  highScoreArray.forEach((score, index) => {
    if (score.word === word) {
      indexOfExistingWord += index;
    }
  });
  return indexOfExistingWord;
}
