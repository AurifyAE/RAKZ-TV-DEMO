import { Box, Typography, Button } from "@mui/material";
import { DesktopWindows, Block } from "@mui/icons-material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import logo from "../assets/logo.png";

const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "#1e1e1e",
  borderRadius: "12px",
  p: 4,
  outline: "none",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
};

const iconWrapperStyles = {
  position: "relative",
  display: "inline-block",
  marginBottom: "20px",
};

const mainIconStyles = {
  fontSize: "6rem",
  color: "#fff",
};

const blockIconStyles = {
  position: "absolute",
  top: "-10px",
  right: "-10px",
  fontSize: "3rem",
  color: "#F44336",
};

const headingStyles = {
  color: "#F33B37",
  fontSize: "32px",
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: "16px",
};

const textStyles = {
  color: "#fff",
  fontSize: "18px",
  fontFamily: "Poppins",
  textAlign: "center",
  marginBottom: "8px",
};

const buttonStyles = {
  marginTop: "35px",
  bgcolor: "#25D366",
  color: "#fff",
  "&:hover": {
    bgcolor: "#1ebe55",
  },
};

export default function LimitExceededModal() {
  return (
    <Box sx={modalStyles}>
      <Box sx={iconWrapperStyles}>
        <DesktopWindows sx={mainIconStyles} />
        <Block sx={blockIconStyles} />
      </Box>
      <Typography variant="h4" sx={headingStyles}>
        Screen Limit Exceeded
      </Typography>
      <Typography sx={textStyles}>
        The number of allowed screens has been exceeded.
      </Typography>
      <Typography sx={textStyles}>Please contact our support team for assistance.</Typography>
      <img src={logo} className="h-18 w-60 mt-5" />
      <Button
        sx={buttonStyles}
        startIcon={<WhatsAppIcon />}
        variant="contained"
      >
        +971 55 705 2211
      </Button>
    </Box>
  );
}
