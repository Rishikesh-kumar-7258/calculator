import {
  Container,
  Stack,
  TextareaAutosize,
  Button,
  TextField,
} from "@mui/material";
import React from "react";

const EquationSolver = () => {
  const [equation, setEquation] = React.useState("");
  const [variables, setVariables] = React.useState("");
  const solveEquation = () => {
    // Extracting individual equations and varaibles
    let equationArray = equation.split("\n");
    let variableArray = variables.split(",");
    let constantArray = [];
    let coefficientMatrix = [];

    for (let i = 0; i < equationArray.length; i++) {
      let equation = equationArray[i];
      constantArray.push(equation.split("=")[1]);
      equation = cleanEquation(equation.split("=")[0], variableArray);
      coefficientMatrix.push(getVariables(equation, variableArray));
    }

    console.log(coefficientMatrix);
  };

  const cleanEquation = (equation, variables) => {
    for (let i = 0; i < variables.length; i++) {
      // if the current variable is not present in the equation
      var regex = new RegExp(`${variables[i]}`, "gi");
      let position = equation.search(regex);
      if (position === -1) {
        equation += `+0${variables[i]}`;
      }

      // if the current variale is present but digit is not present
      regex = new RegExp(`\\d*(?=${variables[i]})`, "gi");
      let match = equation.match(regex)[0];
      if (match === "") {
        equation = equation.replace(regex, "1");
      }
    }

    return equation;
  };

  const getVariables = (equation, variables) => {
    let variableArray = [];
    for (let i = 0; i < variables.length; i++) {
      let regex = new RegExp(`\\d*(?=${variables[i]})`, "gi");
      let match = equation.match(regex)[0];
      variableArray.push(match);
    }
    // return variableArray;
    // console.log(variableArray);
    return variableArray;
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
        <TextField
          variant="filled"
          label="Enter the names of variables. e.g. x,y,z"
          color="primary"
          value={variables}
          onChange={(e) => setVariables(e.target.value)}
        />
        <Button variant="contained" size="large" onClick={solveEquation}>
          Solve
        </Button>
      </Stack>
    </Container>
  );
};

export default EquationSolver;
