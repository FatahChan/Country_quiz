import React, { useEffect } from "react";
import {  Stack, Typography, Button, useMediaQuery } from "@mui/material";
const FlagQuesiton = (props) => {
  // useMediaQuery for if weight is less than 800px
  const isMobile = useMediaQuery("(max-width:600px)");

  const countries = props.countries;
  const selectedCountry = props.selectedFlagCountry;
  const selectedCountryName = selectedCountry.name.common;
  const selectedCountryFlag = selectedCountry.flags.png;
  const selectedCountryCIOC = selectedCountry.cioc;
  const selectRandomCountry = props.selectRandomCountry;
  const setScore = props.setScore;
  const setAskedFlagQuestions = props.setAskedFlagQuestions;
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
        setAskedFlagQuestions((prevAskedFlagQuestions) => [
          ...prevAskedFlagQuestions,
          selectedCountryCIOC,
        ]);
        selectRandomCountry("flag");
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
        This is the flag of ...?
      </Typography>
      <img
        src={selectedCountryFlag}
        alt={"country flag image"}
        style={{
          width: isMobile ? "400px" : "600px",
          height: isMobile ? "200px" : "300px",
          objectFit: "contain",
        }}
      />
      <Stack direction="column" spacing={2}>
        {choices.map((choice) => (
          <Button
            value={choice}
            variant="contained"
            key={choice}
            onClick={handleClick}
            sx={{ width: isMobile ? "350px" : "500px" }}
            color={
              reavealed
                ? choice === selectedCountryName
                  ? "success"
                  : "error"
                : "primary"
            }
          >
            {choice}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
};

export default FlagQuesiton;
