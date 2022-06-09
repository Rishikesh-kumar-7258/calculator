import { Container, Stack, TextareaAutosize, Button } from "@mui/material";
import React from "react";

const EquationSolver = () => {
  const [equation, setEquation] = React.useState("");
  const solveEquation = () => {
    console.log(equation);
    let equationArray = equation.split("\n");
    console.log(equationArray);
  };

  return (
    <Container disableGutters>
      <Stack>
        <TextareaAutosize
          minRows={10}
          placeholder="Enter your equation here.Equation must be of the form ax+by+cz=d"
          value={equation}
          onChange={(e) => setEquation(e.target.value)}
        ></TextareaAutosize>
        <Button variant="contained" size="large" onClick={solveEquation}>
          Solve
        </Button>
      </Stack>
    </Container>
  );
};

export default EquationSolver;
