import React, { useEffect } from "react";
import {  Stack, Typography, Button, useMediaQuery } from "@mui/material";
const CapitalQuestion = (props) => {
  // useMediaQuery for if weight is less than 800px
  const isMobile = useMediaQuery("(max-width:600px)");

  const countries = props.countries;
  const selectedCountry = props.selectedCapitalCountry;
  const selectedCountryName = selectedCountry.name.common;
  const selectedCountryCapitals = selectedCountry.capital;
  const selectedCountryCIOC = selectedCountry.cioc;
  const selectRandomCountry = props.selectRandomCountry;
  const setScore = props.setScore;
  const setAskedCapitalQuestions = props.setAskedCapitalQuestions;
  const gameOver = props.gameOver;
  const [reavealed, setRevealed] = React.useState(false);
  const [choices, setChoices] = React.useState([]);
  // get 3 random countries
  useEffect(() => {
    let choices = [];
    while (choices.length < 3) {
      let randomIndex = Math.floor(Math.random() * countries.length);
      let randomCountry = countries[randomIndex];
      if(!choices.includes(randomCountry) && randomCountry.cioc !== selectedCountryCIOC){
        choices.push(randomCountry.name.common);
      }
    }
    choices.push(selectedCountryName);
    choices.sort(() => Math.random() - 0.5);
    setChoices(choices);
  }, [selectedCountry]);

  const handleClick = async (e) => {
    if (e.target.value === selectedCountryName) {
      setRevealed(true);
      // add delay before changing question
      setTimeout(() => {
        setRevealed(false);
        setScore((prevScore) => {
          localStorage.setItem(
            "highScore",
            Math.max(prevScore + 1, localStorage.getItem("highScore") || 0)
          );
          return prevScore + 1;
        });
        setAskedCapitalQuestions((prevAskedCapitalQuestions) => [
          ...prevAskedCapitalQuestions,
          selectedCountryCIOC,
        ]);
        selectRandomCountry("capital");
      }, 600);
    } else {
      setRevealed(true);
      // add delay before changing question
      setTimeout(() => {
        gameOver();
      }, 600);
    }
  };

  return (
    <Stack spacing={3} alignItems="center">
      <Typography variant="h6" component="h4" align="center">
        <u>{selectedCountryCapitals.join(", ")}</u>{" "}
        {selectedCountryCapitals.length > 1
          ? "are the capitals"
          : "is the capital"}{" "}
        of ...?
      </Typography>
      <Stack direction="column" spacing={2}>
        {choices.map((choice) => (
          <Button
            value={choice}
            variant="contained"
            color={
              reavealed
                ? choice === selectedCountryName
                  ? "success"
                  : "error"
                : "primary"
            }
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
