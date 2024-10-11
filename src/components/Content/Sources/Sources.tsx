import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

export const Sources = () => {
  return (
    <>
      <Typography variant="body1" sx={{ marginBottom: "20px" }}>
        Zdeněk Sýkora popsal algoritmus v textu Můj systém z roku 1967.
        <sup>1</sup> O pár let později, v roce 1970, jej pak spolu s Jaroslavem
        Blažkem popisují v textu Computer-aided multielement geometrical
        abstract paintings.<sup>2</sup>
      </Typography>

      <Box
        component="ol"
        sx={{
          fontFamily: "Roboto mono, monospace",
          fontSize: "12px",
        }}
      >
        <Box component="li" sx={{ paddingBottom: "10px" }}>
          <Typography variant="body2">
            SÝKORA, Zdeněk, KAPPEL Pavel. Zdeněk Sýkora 90. Prague: Verzone,
            2010. ISBN 978- 80-904546-1-3, s. 64-65
          </Typography>
        </Box>
        <Box component="li">
          <Typography variant="body2">
            SÝKORA, Zdeněk, BLAŽEK Jaroslav. Computer aided Multi element
            Geometrical Abstract Paintings. Leonardo. 1970, roč. 3, s. 409-413{" "}
            <Link to="https://www.jstor.org/stable/1572257">
              <img
                src={"/icons/arrow-up-right-from-square.svg"}
                width={12}
                height={12}
                alt={"open icon"}
                style={{ verticalAlign: "text-center" }}
              />
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
};
