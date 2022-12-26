// create a loading page component
import { Box, CircularProgress, Typography } from "@mui/material";

export default function Loading() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
      <Typography
        sx={{ margin: "10px" }}
        variant="h6"
        component="h1"
        align="center"
      >
        Loading...
      </Typography>
    </Box>
  );
}
