import { ReactElement } from "react";
import styled from "styled-components";

export function NewGameButton(props: {
  gameIsOver: boolean;
  winGame: boolean;
  usedLetters: string[];
  word: string;
  buttonName: string;
  onClick: () => void;
}): ReactElement {
  const { winGame, gameIsOver, onClick, buttonName } = props;
  if (gameIsOver || winGame) {
    return (
      <Styling>
        <button
          onClick={() => {
            onClick();
          }}
        >
          {buttonName}
        </button>
      </Styling>
    );
  }
  return <div></div>;
}

const Styling = styled.div`
    width:100px;
    &:hover {
        cursor: pointer
`;

//17ctr R82
