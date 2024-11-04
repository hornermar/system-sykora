import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Container } from "../components/common/Container/Container";

export const PageNotFound = () => {
  return (
    <Container>
      <Typography variant="h2">Tady nic není</Typography>
      <Typography variant="body1">
        Stránka, kterou se snažíš najít, neexistuje.
      </Typography>
      <Typography variant="body1">
        <Link className="underline" to="/">
          Zpět na úvod
        </Link>
      </Typography>
    </Container>
  );
};
