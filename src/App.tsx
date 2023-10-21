import React, { ReactElement, useEffect, useState } from "react";
import { Image } from "./Image";
import { WordDisplay } from "./WordDisplay";
import { styled } from "styled-components";
import { NewGameButton } from "./NewGameButton";
import { Keyboard } from "./Keyboard";
import { ScoreBox } from "./ScoreBox";
import { Score } from "./types";
import {
  getNumberOfMistakes,
  getPokemonMoves,
  getPokemonNames,
  getRandomWord,
  getSavedHighScores,
  newHighScoreIsBest,
  data,
  saveHighScores,
} from "./utils";

const localPokemon = ["arr", "bar", "car", "dar", "ear", "far"];

// const testHighScores: Score[] = [
//   { word: "pichu", numberOfMistakes: 3 },
//   { word: "pikachu", numberOfMistakes: 2 },
//   { word: "raichu", numberOfMistakes: 0 },
// ];

function App(): ReactElement {
  const [usedLetters, setUsedLetters] = useState<string[]>([]);
  const [word, setWord] = useState(getRandomWord([""]));
  const numberOfMistakes = getNumberOfMistakes(usedLetters, word);
  const gameIsWon = word.split("").every((letter) => {
    return usedLetters.join("").includes(letter);
  });
  const loseGame = numberOfMistakes === 6;
  const [highScoreArray, setHighScoreArray] = useState<Score[]>([]);
  useEffect(() => {
    getSavedHighScores().then((highScoreArray: Score[]) => {
      setHighScoreArray(highScoreArray);
    });
  }, []);

  function onLetterPress(letter: string) {
    const letterIsNew = !usedLetters.some((usedLetter) => {
      return usedLetter === letter;
    });

    if (!letterIsNew) {
      return;
    }

    const newUsedLetters = [...usedLetters];

    newUsedLetters.push(letter);
    setUsedLetters(newUsedLetters);

    const gameWillBeWon = word.split("").every((letter) => {
      return newUsedLetters.join("").includes(letter);
    });

    if (!gameWillBeWon) {
      return;
    }
    const blank = data(highScoreArray, word);
    const wordAlreadyGuessed = blank.wordAlreadyGuessed;
    const numberOfMistakesFromExistingWord =
      blank.numberOfMistakesFromExistingWord;
    const indexOfExistingWord = blank.indexOfExistingWord;

    const newHighScoreArray = [...highScoreArray];

    if (
      wordAlreadyGuessed &&
      newHighScoreIsBest(numberOfMistakesFromExistingWord, numberOfMistakes)
    ) {
      newHighScoreArray.splice(indexOfExistingWord, 1, {
        word: word,
        numberOfMistakes: numberOfMistakes,
      });
    }
    if (!wordAlreadyGuessed) {
      newHighScoreArray.push({
        word: word,
        numberOfMistakes: numberOfMistakes,
      });
    }
    setHighScoreArray(newHighScoreArray);
  }

  return (
    <MainLayout>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <NewGameButton
          winGame={gameIsWon}
          gameIsOver={loseGame}
          buttonName={"GEN I POKEMON NAMES"}
          onClick={async () => {
            const newUsedLetters: string[] = [];
            const newWord = getRandomWord(localPokemon);
            const pokemonNameLibrary = await getPokemonNames();
            // const newWord = getRandomWord(pokemonNameLibrary);
            setWord(newWord.toUpperCase());
            return setUsedLetters(newUsedLetters);
          }}
        />
        <NewGameButton
          winGame={gameIsWon}
          gameIsOver={loseGame}
          buttonName={"GEN I POKEMON MOVES"}
          onClick={async () => {
            const newUsedLetters = [];
            const pokemonMoveLibrary = await getPokemonMoves();
            const newWord = getRandomWord(pokemonMoveLibrary);
            // const newWord = getRandomWord(localMoves);
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

      {loseGame ? <div>GAME OVER</div> : <div></div>}
      {gameIsWon && word.length !== 0 ? <div>YOU WON</div> : null}
      <Image hangmanProgress={numberOfMistakes} />
      <button
        onClick={() => {
          setUsedLetters([]);
        }}
      >
        RESET WORD
      </button>
      <WordDisplay
        word={word}
        usedLetters={usedLetters}
        gameIsOver={loseGame}
      />

      <Keyboard
        usedLetters={usedLetters}
        word={word}
        onLetterPress={loseGame || gameIsWon ? undefined : onLetterPress}
      />
      <div>
        <button
          onClick={() => {
            setHighScoreArray([]);
          }}
        >
          RESET SCORES
        </button>
        <button
          onClick={() => {
            saveHighScores(highScoreArray);
          }}
        >
          SAVE SCORES
        </button>
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
