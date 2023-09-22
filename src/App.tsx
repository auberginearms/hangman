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

function lessMistakesMade(
  highScoreArray: Score,
  word: string,
  numberOfMistakes: number
): boolean {
  //compare the number of mistakes where the highscorearray.index.word and word are the same
  return true;
}

function App(): ReactElement {
  const [usedLetters, setUsedLetters] = useState<string[]>([]);
  const [word, setWord] = useState(getRandomWord([""]));
  const numberOfMistakes = getNumberOfMistakes(usedLetters, word);
  const gameIsWon = word.split("").every((letter) => {
    return usedLetters.join("").includes(letter);
  });
  const loseGame = numberOfMistakes === 6;
  const [highScoreArray, setHighScoreArray] = useState<Score>([]);
  const wordAlreadyGuessed = highScoreArray.some((score) => {
    return score.word === word;
  });

  function onLetterPress(letter: string) {
    const newHighScoreArray = [...highScoreArray];
    const letterIsNew = !usedLetters.some((usedLetter) => {
      return usedLetter === letter;
    });
    const newUsedLetters = [...usedLetters];

    if (letterIsNew) {
      newUsedLetters.push(letter);
    }
    const gameWillBeWon = word.split("").every((letter) => {
      return newUsedLetters.join("").includes(letter);
    });

    if (gameWillBeWon) {
      console.log("you won");
    }
    setUsedLetters(newUsedLetters);

    // console.log("word already guessed:" + wordAlreadyGuessed);
    // console.log("game won (newusedletters)):" + gameWon);

    // if (!wordAlreadyGuessed && gameWon) {
    //   newHighScoreArray.push({
    //     word: word,
    //     numberOfMistakes: numberOfMistakes,
    //   });
    //   console.log("newhighscorearray:" + newHighScoreArray);
    //   return setHighScoreArray(newHighScoreArray);
    // }
    // if (wordAlreadyGuessed && !winGame) {
    // }
    // console.log(gameWon);
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
            // const pokemonNameLibrary = await getPokemonNames();
            // const randomWord = getRandomWord(pokemonNameLibrary);
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
      {gameIsWon && word.length !== 0 ? <div>YOU WON</div> : null}
      <Image hangmanProgress={numberOfMistakes} />
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
