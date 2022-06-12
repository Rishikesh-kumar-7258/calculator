import React from "react";
import {
  Box,
  Container,
  Grid,
  Stack,
  TextField,
  Button,
  FormControl,
  InputAdornment,
} from "@mui/material";

const Basic = () => {
  const [equation, setEquation] = React.useState("");
  const [solution, setSolution] = React.useState("");
  const numpads = [
    "%",
    "CE",
    "C",
    "DEL",
    "1/x",
    "x^2",
    "sqrt",
    "/",
    "7",
    "8",
    "9",
    "x",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "+/-",
    "0",
    ".",
    "=",
  ];

  const handleButtonClick = (e) => {
    console.log(e.target.innerText);

    const currentTarget = e.target.innerText;

    if (currentTarget === "DEL") {
      setEquation((prev) => {
        if (prev.length === 0) {
          return "";
        } else {
          return prev.substring(0, prev.length - 1);
        }
      });
    } else if (
      isNumber(currentTarget) ||
      currentTarget === "." ||
      currentTarget === "+" ||
      currentTarget === "-" ||
      currentTarget === "X" ||
      currentTarget === "/"
    ) {
      setEquation((prev) => {
        prev += currentTarget.toLowerCase();
        return prev;
      });
    } else if (currentTarget === "C") {
      setEquation("");
      setSolution("");
    } else if (currentTarget === "+/-") {
    }
  };

  const isNumber = (num) => {
    num = parseInt(num);
    return !isNaN(num);
  };

  return (
    <Container>
      <Stack
        direction="column"
        sx={{
          position: "relative",
          height: "80vh",
          display: "grid",
          gridTemplateRows: "auto 1fr",
          placeItems: "center",
        }}
      >
        <FormControl fullWidth sx={{ display: "flex", flexDirection: "row" }}>
          <TextField
            disabled
            label={equation}
            variant="filled"
            fullWidth
            placeholder="0"
          />
          <TextField
            variant="filled"
            disabled
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">=</InputAdornment>
              ),
            }}
          ></TextField>
        </FormControl>
        <Box
          sx={{
            flexGrow: 1,
            textAlign: "center",
            backgroundColor: "#7b6120",
          }}
        >
          <Grid container>
            {numpads.map((numpad) => {
              return (
                <Grid
                  item
                  xs={3}
                  key={numpad}
                  sx={{
                    border: "1px solid black",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "5px",
                  }}
                >
                  <Button
                    fullWidth
                    sx={{
                      padding: 3,
                      bgcolor: "black",
                      fontSize: 16,
                      fontWeight: "bold",
                      transition: "all 0.1s",
                      "&:focus": {
                        transform: "scale(0.95)",
                      },
                    }}
                    variant="outlined"
                    onClick={handleButtonClick}
                    disableRipple
                  >
                    {numpad}
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Stack>
    </Container>
  );
};

export default Basic;
