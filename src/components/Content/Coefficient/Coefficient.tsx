import { FormValues } from "../../../types/FormValues";
import { Slider, Box, Typography } from "@mui/material";

const MAX = 4;
const MIN = 0;

type CoefficientProps = {
  coefficient: FormValues["coefficient"];
  onFormChange: (newFormValues: Partial<FormValues>) => void;
};

export const Coefficient = ({
  coefficient,
  onFormChange,
}: CoefficientProps) => {
  return (
    <>
      <Typography variant="body1">Dále zvol koeficient:</Typography>

      <Box sx={{ padding: "0 20px 30px" }}>
        <Slider
          value={coefficient}
          step={0.01}
          min={coefficient === 0 ? 0 : 0.01}
          max={4}
          onChange={(_, newValue: number | number[]) =>
            onFormChange({ coefficient: newValue as number })
          }
          valueLabelDisplay="on"
          sx={{ margin: "30px 0 0" }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2">{MIN}</Typography>
          <Typography variant="body2">{MAX}</Typography>
        </Box>
      </Box>
      <Typography variant="body1">
        Jeho funkcí je zpomalit nebo urychlit přechody od světlých elementů k
        tmavým a naopak. Nižší koeficient znamená pozvolnějí přechody, vyšší
        kontrastnější.
      </Typography>

      <Typography variant="body1">
        Připočítává se nebo odečítá v místech, kde se v mřížce nachází <b>+</b>{" "}
        nebo <b>-</b>.
      </Typography>
    </>
  );
};
