import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <>
      <Box>
        <Box
          width="100%"
          backgroundColor={theme.palette.background.alt}
          p="1rem 0%"
          textAlign="center"
          sx={{ boxShadow: "0px 1px 7px #858585" }}
        >
          <Typography
            fontWeight="bold"
            fontSize="32px"
            color="primary"
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            SocialBuzz
          </Typography>
        </Box>

        <Box
          width={isNonMobileScreens ? "50%" : "93%"}
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
          sx={{ boxShadow: "0px 1px 15px #858585" }}
        >
          <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
            Welcome to SocialBuzz
          </Typography>
          <Form />
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
