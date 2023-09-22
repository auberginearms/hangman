import hangman0 from "./hangman0.jpg";
import hangman1 from "./hangman1.jpg";
import hangman2 from "./hangman2.jpg";
import hangman3 from "./hangman3.jpg";
import hangman4 from "./hangman4.jpg";
import hangman5 from "./hangman5.jpg";
import hangman6 from "./hangman6.jpg";

import { ReactElement } from "react";
import { styled } from "styled-components";

export function Image(props: { hangmanProgress: number }): ReactElement {
  const { hangmanProgress } = props;

  return (
    <img
      src={hangmanImages[Math.min(hangmanProgress, hangmanImages.length - 1)]}
    ></img>
  );
}

const hangmanImages = [
  hangman0,
  hangman1,
  hangman2,
  hangman3,
  hangman4,
  hangman5,
  hangman6,
];

const ImageStyling = styled.div`
  border: 4px solid black
  padding: 5px
  max-width:100%;
  height:auto;
  display:block;
  margin-left:auto;
  margin-right:auto;
  width:50%
`;
