import React, { useEffect, useMemo, useState } from "react";
import { Container, Stack, Typography, useMediaQuery } from "@mui/material";
import FlagQuesiton from "./components/FlagQuesiton";
import CapitalQuestion from "./components/CapitalQuestion";
import { useNavigate } from "react-router-dom";
export function App() {
  // useMediaQuery for if height is less than 800px
  const isMobile = useMediaQuery("(max-height:800px)");
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [selectedFlagCountry, setselectedFlagCountry] = useState(null);
  const [selectedCapitalCountry, setselectedCapitalCountry] = useState(null);
  const [score, setScore] = useState(0);

  // will contain the ioc of the countries that have been asked
  const [AskedFlagQuestions, setAskedFlagQuestions] = useState([]);
  const [AskedCapitalQuestions, setAskedCapitalQuestions] = useState([]);

  async function fetchCountriesData() {
    const response = await fetch("https://restcountries.com/v3.1/all");
    let data = await response.json();
    data = data.filter((country) => country.capital);
    return data;
  }
  function gameOver() {
    localStorage.setItem("highScore", Math.max(score, local storage.getItem("highScore")));
    setScore(0);
    setAskedFlagQuestions([]);
    setAskedCapitalQuestions([]);
    navigate("/");
  }
  function selectRandomCountry(type) {
    if (type !== "flag") {
      // get a coutnries that has not been asked in capital questions

      let countriesNotAskedCapital = countries.filter(
        (country) => !AskedCapitalQuestions.includes(country.cioc)
      );

      // get a random country from the countries that have not been asked in capital questions
      let randomIndex = Math.floor(
        Math.random() * countriesNotAskedCapital.length
      );
      let randomCountry = countriesNotAskedCapital[randomIndex];
      setselectedCapitalCountry(randomCountry);
    }

    if (type !== "capital") {
      // get a coutnries that has not been asked in flag  questions

      let countriesNotAskedFlag = countries.filter(
        (country) => !AskedFlagQuestions.includes(country.cioc)
      );
      let randomIndex = Math.floor(
        Math.random() * countriesNotAskedFlag.length
      );

      // get a random country from the countries that have not been asked in flag questions

      let randomCountry = countriesNotAskedFlag[randomIndex];
      setselectedFlagCountry(randomCountry);
    }
  }
  useEffect(() => {
    let ignore = false;
    const cachedCountries = localStorage.getItem("countriesv2");
    if (cachedCountries) {
      setCountries(JSON.parse(cachedCountries));
    } else {
      setCountries([]);
      fetchCountriesData().then((result) => {
        if (!ignore) {
          setCountries(result);
          localStorage.setItem("countriesv2", JSON.stringify(result));
        }
      });
    }
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    selectRandomCountry();
  }, [countries]);

  if (
    countries.length === 0 ||
    !selectedCapitalCountry ||
    !selectedFlagCountry
  ) {
    return <div>Loading...</div>;
  }
  console.log(selectedCapitalCountry, selectedFlagCountry, "loading...");

  return (
    <Container
      className="App"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        maxHeight: "100vh",
      }}
    >
      <Stack sx={{ minHeight: "90vh" }} gap={isMobile ? 2 : 4}>
        <Typography
          variant={isMobile ? "h5" : "h3"}
          component="h3"
          align="center"
        >
          High Score: {localStorage.getItem("highScore") ?? 0}
        </Typography>

        <Typography variant="h2" align="center">
          Score: {score}
        </Typography>

        {Math.random() >
        ((countries.length - AskedFlagQuestions.length) /
          (countries.length - AskedCapitalQuestions.length)) *
          0.5 ? (
          <FlagQuesiton
            selectedFlagCountry={selectedFlagCountry}
            countries={countries}
            setScore={setScore}
            setAskedFlagQuestions={setAskedFlagQuestions}
            selectRandomCountry={selectRandomCountry}
            gameOver={gameOver}
          ></FlagQuesiton>
        ) : (
          <CapitalQuestion
            selectedCapitalCountry={selectedCapitalCountry}
            countries={countries}
            setScore={setScore}
            setAskedCapitalQuestions={setAskedCapitalQuestions}
            selectRandomCountry={selectRandomCountry}
            gameOver={gameOver}
          ></CapitalQuestion>
        )}
      </Stack>
      <Typography
        sx={{ display: "fixed", bottom: 0 }}
        variant="subtitle2"
        component="h2"
        align="center"
      >
        Made by:{"Ahmad Fathallah"}
        <br />
        <a href="https://github.com/FatahChan/Country_quiz">Source Code</a>
      </Typography>
    </Container>
  );
}
