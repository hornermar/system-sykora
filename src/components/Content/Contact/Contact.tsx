import { Typography } from "@mui/material";

export const Contact = () => {
  return (
    <>
      <Typography variant="h3" sx={{ margin: "30px 0 10px" }}>
        Kontakt
      </Typography>

      <Typography variant="body1">
        <a
          href="https://marketahajek.cz"
          className="underline"
          rel="noopener noreferrer"
        >
          www.marketahajek.cz
        </a>
      </Typography>
    </>
  );
};
