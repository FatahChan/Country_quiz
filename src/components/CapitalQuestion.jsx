import React from "react";
import { Box, Stack, Typography, Button, useMediaQuery } from "@mui/material";
const CapitalQuestion = (props) => {
  // useMediaQuery for if weight is less than 800px
  const isMobile = useMediaQuery("(max-width:600px)");

  const countries = props.countries;
  const selectedCountry = props.selectedCapitalCountry;
  const selectedCountryName = selectedCountry.name.common;
  const selectedCountryCapital = selectedCountry.capital[0];
  const selectedCountryCIOC = selectedCountry.cioc;
  const selectRandomCountry = props.selectRandomCountry;
  const setScore = props.setScore;
  const setAskedCapitalQuestions = props.setAskedCapitalQuestions;
  let choices = [];

  // get 3 random countries
  for (let i = 0; i < 3; i++) {
    let randomIndex = Math.floor(Math.random() * countries.length);
    let randomCountry = countries[randomIndex];
    choices.push(randomCountry.name.common);
  }

  // add the correct answer to the choices
  choices.push(selectedCountryName);

  // shuffle the choices
  choices.sort(() => Math.random() - 0.5);

  const handleClick = (e) => {
    if (e.target.value === selectedCountryName) {
      setScore((prevScore) => prevScore + 1);
      setAskedCapitalQuestions((prevAskedFlagQuestions) => [
        ...prevAskedFlagQuestions,
        selectedCountryCIOC,
      ]);
      selectRandomCountry("capital");
    } else {
      // TODO: Show game over screen
      alert("Game Over");
    }
  };

  return (
    <Stack spacing={3} alignItems="center">
      <Typography variant="h6" component="h4" align="center">
        <u>{selectedCountryCapital}</u> is the capital of ...?
      </Typography>
      <Stack direction="column" spacing={2}>
        {choices.map((choice) => (
          <Button
            value={choice}
            variant="contained"
            color="primary"
            key={choice}
            onClick={handleClick}
            sx={{ width: isMobile ? "350px" : "500px" }}
          >
            {choice}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
};

export default CapitalQuestion;
