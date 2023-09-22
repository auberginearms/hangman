import { ReactElement, useState } from "react";
import { styled } from "styled-components";

export function WordDisplay(props: {
  word: string;
  usedLetters: string[];
  gameIsOver: boolean;
}): ReactElement {
  const { gameIsOver, word, usedLetters } = props;
  const displayedLetters = word.split("").map((letter) => {
    const letterNotYetGuessed = !usedLetters.includes(letter);
    const shouldDisplayEmptyLine = letterNotYetGuessed && !gameIsOver;
    const shouldDisplayBlank = letter === " " || letter === "-";
    if (shouldDisplayBlank) {
      return <Blank></Blank>;
    }
    if (shouldDisplayEmptyLine) {
      return <Box></Box>;
    }
    return (
      <Box
        style={{
          color: letterNotYetGuessed ? "red" : "black",
        }}
      >
        {letter}
      </Box>
    );
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
      }}
    >
      {displayedLetters}
    </div>
  );
}

const Box = styled.div`
  border-bottom: 1px solid black;
  width: 20px;
  justify-content: center;
  display: grid;
  margin: 5px;
`;

const Blank = styled.div`
  border-color: white;
  justify-content: center;
  display: grid;
  margin: 5px;
`;
