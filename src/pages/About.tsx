import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Container } from "../components/common/Container/Container";

const About = () => {
  return (
    <>
      <Typography variant="body1" sx={{ marginBottom: "20px" }}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi
        totam ipsa numquam necessitatibus animi voluptates, neque modi est, ad
        reiciendis corporis aperiam! Explicabo minus laboriosam placeat,
        quibusdam perferendis possimus facilis.
      </Typography>

      <Box
        component="ol"
        sx={{
          fontFamily: "Roboto mono, monospace",
          fontSize: "12px",
        }}
      >
        <Box component="li" sx={{ paddingBottom: "10px" }}>
          <Typography variant="body2">Odkaz</Typography>
        </Box>
        <Box component="li">
          <Typography variant="body2">
            Kontakt
            <Link to="https://www.jstor.org/stable/1572257">
              <img
                src={"/icons/arrow-up-right-from-square.svg"}
                width={11}
                height={11}
                alt={"open icon"}
              />
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export const AboutWrapper = () => {
  const theme = useTheme();

  return (
    <Container
      title="O projektu"
      children={<About />}
      color={theme.palette.primary}
      fulllHeight
    />
  );
};
