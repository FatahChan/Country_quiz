import {
  Button,
  Typography,
  Container,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const Home = () => {
  // create a component that introduces the game and has a button to start the game
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-height:400px)");
  return (
    <Container
      sx={{
        height: isMobile ? "300px" : "600px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack spacing={4}>
        <Typography variant="h4" component="h1" align="center">
          Welcome to the Country Quiz!
        </Typography>
        <Typography variant="h6" component="h2" align="center">
          This is a quiz game where you will be asked to identify the country
          from its flag or capital city.
        </Typography>
        <Typography variant="h6" component="h2" align="center">
          You will be given 4 choices for each question. If you get the answer
          correct, you will be awarded 1 point. If you get the answer wrong, the
          game will end.
        </Typography>
        <Typography variant="h6" component="h2" align="center">
          You can play the game as many times as you want. Your high score will
          be saved.
        </Typography>
        <Typography variant="h6" component="h2" align="center">
          Your high score is {localStorage.getItem("highScore") || 0}.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/app")}
        >
          Start Game
        </Button>
      </Stack>
    </Container>
  );
};

export default Home;
