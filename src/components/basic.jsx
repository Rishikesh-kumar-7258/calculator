import React from "react";
import { Box, Container, Grid, Stack, TextField } from "@mui/material";
import { Backspace } from "@mui/icons-material";

const Basic = () => {
  return (
    <Container>
      <Stack direction="column">
        <TextField label="0" />
        <Box
          sx={{
            flexGrow: 1,
            textAlign: "center",
            padding: 2,
            border: "1px solid red",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={3}>
              %
            </Grid>
            <Grid item xs={3}>
              CE
            </Grid>
            <Grid item xs={3}>
              C
            </Grid>
            <Grid item xs={3}>
              <Backspace />
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Container>
  );
};

export default Basic;
