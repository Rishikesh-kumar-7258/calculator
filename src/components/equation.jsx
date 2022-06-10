import {
  Container,
  Stack,
  TextareaAutosize,
  Button,
  TextField,
} from "@mui/material";
import React from "react";
import matrix from "matrix-js";

const EquationSolver = () => {
  const [equation, setEquation] = React.useState("");
  const [variables, setVariables] = React.useState("");

  // function to solve the equation
  const solveEquation = () => {
    // Extracting individual equations and varaibles
    let equationArray = equation.split("\n");
    let variableArray = variables.split(",");
    let constantArray = [];
    let coefficientMatrix = [];

    for (let i = 0; i < equationArray.length; i++) {
      let equation = equationArray[i];
      constantArray.push(equation.split("=")[1]);

      // cleaning the equation
      equation = cleanEquation(equation.split("=")[0], variableArray);

      // extracting coefficient with sign
      coefficientMatrix.push(getVariables(equation, variableArray));
    }

    // converting the coefficient from string to number
    coefficientMatrix = coefficientMatrix.map((row) =>
      row.map((coefficient) => parseFloat(coefficient))
    );
    constantArray = constantArray.map((constant) => {
      let temp = [];
      temp.push(parseFloat(constant));
      return temp;
    });

    console.log(getSolution(coefficientMatrix, constantArray, variableArray));
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
      // Regex expression to match the coefficient of current variable
      let regex = new RegExp(`\\d*(?=${variables[i]})`, "gi");

      // Getting the coefficient of current variable and also the position
      let match = equation.match(regex)[0];
      let pos = equation.search(regex);

      if (pos - 1 >= 0 && equation[pos - 1] === "-") {
        match = `-${match}`;
      }
      variableArray.push(match);
    }
    return variableArray;
  };

  const getSolution = (coefficientArray, constantArray, variables) => {
    var coefficientMatrix = matrix(coefficientArray);

    const delta = coefficientMatrix.det();
    if (delta === 0) {
      return "No Solution";
    }

    let solution = [];
    for (let i = 0; i < variables.length; i++) {
      var temp = matrix(coefficientMatrix());
      for (let j = 0; j < constantArray.length; j++) {
        temp = matrix(temp.set(j, i).to(constantArray[j][0]));
      }

      console.log(temp());

      solution.push(temp.det() / delta);
    }

    return solution;
  };

  return (
    <Container disableGutters>
      <Stack>
        <TextareaAutosize
          minRows={10}
          placeholder="Enter your equation here.Equation must be of the form ax+by+cz=d"
          value={equation}
          onChange={(e) => setEquation(e.target.value)}
          sx={{ padding: 2 }}
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
