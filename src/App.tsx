import React, { ReactElement, useState } from "react";
import { Image } from "./Image";
import { WordDisplay } from "./WordDisplay";
import { styled } from "styled-components";
import { NewGameButton } from "./NewGameButton";
import { Keyboard } from "./Keyboard";
import axios from "axios";
import { ScoreBox } from "./ScoreBox";
import { Score } from "./types";

const localMoves = ["high-jump", "get more", "pick-up-sticks"];
const localPokemon = ["arr", "bar", "car"];

async function getPokemonNames() {
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

async function getPokemonMoves() {
  const response = await axios.get("https://pokeapi.co/api/v2/generation/1/");
  const generationOneMoves: { name: string; url: string }[] =
    response.data.moves;
  const generationOneMoveNames: string[] = generationOneMoves.map((move) => {
    return move.name;
  });
  return generationOneMoveNames;
}

function getRandomWord(potentialWords: string[]): string {
  return potentialWords[Math.floor(Math.random() * potentialWords.length)];
}
function getNumberOfMistakes(letters: string[], word: string) {
  const lettersNotInWord = letters.filter((letter) => {
    return !word.includes(letter);
  });

  return lettersNotInWord.length;
}

function App(): ReactElement {
  const [usedLetters, setUsedLetters] = useState<string[]>([]);
  const [word, setWord] = useState(getRandomWord([""]));
  const numberOfMistakes = getNumberOfMistakes(usedLetters, word);
  const winGame = word.split("").every((letter) => {
    return usedLetters.join("").includes(letter);
  });
  const loseGame = numberOfMistakes === 6;
  const [highScoreArray, setHighScoreArray] = useState<Score>([]);
  const wordAlreadyGuessed = highScoreArray.some((score) => {
    return score.word === word;
  });
  function lessMistakesMade(
    highScoreArray: Score,
    word: string,
    numberOfMistakes: number
  ): boolean {
    //compare the number of mistakes where the highscorearray.index.word and word are the same
    return true;
  }
  function onLetterPress(letter: string) {
    const newHighScoreArray = [...highScoreArray];
    //gameWon needs a different name
    const gameWon = word.split("").every((letter) => {
      return newUsedLetters.join("").includes(letter);
    });
    const letterIsNew = !usedLetters.some((usedLetter) => {
      return usedLetter === letter;
    });
    const newUsedLetters = [...usedLetters];
    if (letterIsNew && !loseGame && !winGame) {
      newUsedLetters.push(letter);
    }
    setUsedLetters(newUsedLetters);
    if (!wordAlreadyGuessed && !winGame && gameWon) {
      newHighScoreArray.push({
        word: word,
        numberOfMistakes: numberOfMistakes,
      });
      return setHighScoreArray(newHighScoreArray);
    }
    if (gameWon && wordAlreadyGuessed && !winGame) {
    }
  }

  return (
    <MainLayout>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <NewGameButton
          winGame={winGame}
          gameIsOver={loseGame}
          word={word}
          usedLetters={usedLetters}
          buttonName={"GEN I POKEMON NAMES"}
          onClick={async () => {
            const newUsedLetters: string[] = [];
            const newWord = getRandomWord(localPokemon);
            // const pokemonNameLibrary = await getPokemonNames();
            // const randomWord = getRandomWord(pokemonNameLibrary);
            setWord(newWord.toUpperCase());
            return setUsedLetters(newUsedLetters);
          }}
        />
        <NewGameButton
          winGame={winGame}
          gameIsOver={loseGame}
          word={word}
          usedLetters={usedLetters}
          buttonName={"GEN I POKEMON MOVES"}
          onClick={async () => {
            const newUsedLetters = [];
            // const pokemonMoveLibrary = await getPokemonMoves();
            // const randomWord = getRandomWord(pokemonMoveLibrary);
            const newWord = getRandomWord(localMoves);
            setWord(newWord.toUpperCase());

            if (newWord.includes(" ")) {
              newUsedLetters.push(" ");
            }
            if (newWord.includes("-")) {
              newUsedLetters.push("-");
            }

            return setUsedLetters(newUsedLetters);
          }}
        />
      </div>
      <button
        onClick={() => {
          setUsedLetters([]);
        }}
      >
        RESET
      </button>

      {loseGame ? <div>GAME OVER</div> : <div></div>}
      {winGame && word.length !== 0 ? <div>YOU WON</div> : null}
      <Image hangmanProgress={numberOfMistakes} />
      <WordDisplay
        word={word}
        usedLetters={usedLetters}
        gameIsOver={loseGame}
      />
      <Keyboard
        usedLetters={usedLetters}
        word={word}
        onLetterPress={onLetterPress}
      />
      <div>
        <ScoreBox highScoreArray={highScoreArray}></ScoreBox>
      </div>
    </MainLayout>
  );
}

export default App;

const MainLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;
