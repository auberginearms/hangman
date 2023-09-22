import { ReactElement, useState } from "react";
import { styled } from "styled-components";

const keyboardLetters = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

export function Keyboard(props: {
  usedLetters: string[];
  word: string;
  onLetterPress: (letter: string) => void;
}): ReactElement {
  const { usedLetters, word, onLetterPress: onLetterPress } = props;
  const letterButtons = keyboardLetters.map((row) => {
    return (
      <KeyboardStyling>
        {row.map((letter) => {
          return (
            <button
              onClick={() => {
                onLetterPress(letter);
              }}
              style={{
                height: 50,
                width: 50,
                margin: 5,
                borderWidth: 2,
                borderStyle: "outset",
                borderColor: "black",
                fontSize: 20,
                backgroundColor:
                  word.includes(letter) && usedLetters.includes(letter)
                    ? "green"
                    : !word.includes(letter) && usedLetters.includes(letter)
                    ? "red"
                    : undefined,
              }}
            >
              {letter}
            </button>
          );
        })}
      </KeyboardStyling>
    );
  });

  return <>{letterButtons}</>;
}

const KeyboardStyling = styled.div`
  display:flex
  flex-direction:column
  justify-content: center;
  align-items: center;
 
`;
