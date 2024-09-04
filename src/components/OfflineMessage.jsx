import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import noInternet from "../assets/noInternet.png";

export default function NoInternet() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "#FFFFFF",
        gap: "10px",
      }}
    >
      <img src={noInternet} alt="" />
      <Typography
        sx={{ fontSize: "2.5vw", fontWeight: "bold", textAlign: "center" }}
      >
        No internet connection
      </Typography>
      <Typography sx={{ fontSize: "3vw", textAlign: "center" }}>
        Make sure wifi or cellular connection is turned on <br /> and then try
        again{" "}
      </Typography>
    </Box>
  );
}
