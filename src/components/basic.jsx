import React from "react";
import {
  Box,
  Container,
  Grid,
  Stack,
  TextField,
  Button,
  Typography,
  FormControl,
} from "@mui/material";

const Basic = () => {
  const [equation, setEquation] = React.useState("");
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
    "X",
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
            label="0"
            disabled
            value={equation}
            variant="filled"
            fullWidth
          />
          <TextField
            label="ans"
            variant="filled"
            disabled
            fullWidth
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
                    }}
                    variant="outlined"
                  >
                    <Typography variant="h6" color="primary">
                      {numpad}
                    </Typography>
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
