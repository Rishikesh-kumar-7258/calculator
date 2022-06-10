import {
  Container,
  Stack,
  TextareaAutosize,
  Button,
  TextField,
  ButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  AlertTitle,
} from "@mui/material";
import React from "react";
import matrix from "matrix-js";
import { Snackbar } from "@mui/material";

const EquationSolver = () => {
  const [equation, setEquation] = React.useState("");
  const [variables, setVariables] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [result, setResult] = React.useState("");
  const [showSolutionBtn, setShowSolutionBtn] = React.useState(true);
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertTitle, setAlertTitle] = React.useState("");
  const [alertText, setAlertText] = React.useState("");
  const [alertType, setAlertType] = React.useState("");

  const handleClose = () => {
    navigator.clipboard.writeText(result);
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    setAlertTitle("");
    setAlertText("");
    setAlertType("");
  };

  // function to solve the equation
  const solveEquation = () => {
    // check if the equation is empty
    if (equation === "") {
      setAlertTitle("Empty Equation");
      setAlertText("Enter your equations");
      setShowAlert(true);
      setAlertType("error");
      return;
    }

    // check if the variables are empty
    if (variables === "") {
      setAlertTitle("Empty Variables");
      setAlertText("Enter your variables");
      setShowAlert(true);
      setAlertType("error");
      return;
    }

    // Extracting individual equations and varaibles
    let equationArray = equation.split("\n");
    let variableArray = variables.split(",");
    let constantArray = [];
    let coefficientMatrix = [];

    // checking if we have enough equations
    if (equationArray.length !== variableArray.length) {
      setAlertTitle("Wrong Input");
      setAlertText("Enter equal number of variables and equations");
      setShowAlert(true);
      setAlertType("error");
      return;
    }

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

    const solution = getSolution(
      coefficientMatrix,
      constantArray,
      variableArray
    );

    if (solution === null) {
      setAlertText("No solution for this equation");
      setShowAlert(true);
      setAlertType("error");
      return;
    }

    let tempResult = "";
    for (let i = 0; i < variableArray.length; i++) {
      tempResult += `${variableArray[i]} = ${solution[i]}   ,`;
    }

    setResult(tempResult);
    setShowSolutionBtn(false);

    setAlertText("Solved");
    setShowAlert(true);
    setAlertType("success");
    return;
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
      return null;
    }

    let solution = [];
    for (let i = 0; i < variables.length; i++) {
      var temp = matrix(coefficientMatrix());
      for (let j = 0; j < constantArray.length; j++) {
        temp = matrix(temp.set(j, i).to(constantArray[j][0]));
      }

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
        <ButtonGroup
          variant="contained"
          size="large"
          fullWidth
          disableElevation
          orientation="vertical"
        >
          <Button onClick={solveEquation}>Solve</Button>
          <Button onClick={handleOpen} disabled={showSolutionBtn}>
            View
          </Button>
          <Button
            onClick={() => {
              setEquation("");
              setVariables("");
              setResult("");
              setShowSolutionBtn(true);
            }}
          >
            Clear
          </Button>
        </ButtonGroup>
      </Stack>
      <Dialog open={open} keepMounted onClose={handleClose}>
        <DialogTitle>Solution</DialogTitle>
        <DialogContent>{result}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="success">
            Copy
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={alertType === "" ? "error" : alertType}
          variant="filled"
          onClose={handleAlertClose}
        >
          <AlertTitle>{alertTitle}</AlertTitle>
          {alertText}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EquationSolver;
