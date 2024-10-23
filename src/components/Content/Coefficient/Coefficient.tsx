import { FormValues } from "../../../types/FormValues";
import { Slider, Box, Typography } from "@mui/material";

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
      <Typography variant="body1">
        Dále zvol koeficient. Ten má mít hodnotu v rozmezí od <b>0</b> do{" "}
        <b>4</b>.
      </Typography>

      <Box sx={{ padding: "0 20px" }}>
        <Slider
          value={coefficient}
          step={0.01}
          min={coefficient === 0 ? 0 : 0.01}
          max={3.99}
          onChange={(_, newValue: number | number[]) =>
            onFormChange({ coefficient: newValue as number })
          }
          valueLabelDisplay="on"
          sx={{ margin: "40px 0 35px" }}
        />
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
