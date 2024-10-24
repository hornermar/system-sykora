import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const Contact = () => {
  return (
    <>
      <Typography variant="h3" sx={{ margin: "20px 0" }}>
        Kontakt
      </Typography>

      <Typography variant="body1">
        <Link to="https://marketahajek.cz" className="underline">
          www.marketahajek.cz
        </Link>
      </Typography>
    </>
  );
};
