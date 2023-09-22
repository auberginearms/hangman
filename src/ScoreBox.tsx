import { ReactElement } from "react";
import { styled } from "styled-components";
import { Score } from "./types";

const testHighScores = [
  { word: "pichu", mistakes: 3 },
  { word: "pikachu", mistakes: 2 },
  { word: "raichu", mistakes: 0 },
];

export function ScoreBox(props: { highScoreArray: Score }): ReactElement {
  const { highScoreArray } = props;
  return (
    <Box>
      LEAST MISTAKES RECORDS
      {highScoreArray.map((score) => {
        return (
          <div>
            {score.word}: {score.numberOfMistakes}
          </div>
        );
      })}
    </Box>
  );
}

const Box = styled.div`
  border: black solid 1px;
  border-style: outset;
  width: 600px;
  height: 600px;
  justify-content: left;
  display: flex;
  flex-direction: column;
  margin: 5px;
`;

// height: 50,
// width: 50,
// margin: 5,
// borderWidth: 2,
// borderStyle: "outset",
// borderColor: "black",
