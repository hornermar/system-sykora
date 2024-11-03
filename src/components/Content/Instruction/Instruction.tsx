import { Typography, Box, Stack, MobileStepper } from "@mui/material";
import { Step, useStep } from "../../../hooks/useStep";
import { map } from "lodash";
import { useTheme } from "@mui/material/styles";

type OrderedListProps = {
  steps: Step[];
  start?: number;
};

const OrderedList = ({ steps, start }: OrderedListProps) => (
  <Box
    component="ol"
    start={start}
    sx={{
      fontFamily: "Roboto mono, monospace",
      whiteSpace: "nowrap",
      margin: 0,
    }}
  >
    {map(steps, (step: Step) => (
      <Box component="li" key={step.order}>
        <Typography variant="subtitle2">{step.title}</Typography>
      </Box>
    ))}
  </Box>
);

type ExplanationProps = {
  children: React.ReactNode;
  description: string;
  title?: string;
  start?: number;
  color?: string;
  size?: number;
  displaySeparator?: boolean;
};

const Explanation = ({
  description,
  title,
  color,
  children,
  size,
  displaySeparator,
}: ExplanationProps) => {
  const theme = useTheme();
  return (
    <>
      {title && (
        <Typography variant="body1" sx={{ margin: "10px 0 10px" }}>
          {title}
        </Typography>
      )}

      <Stack
        flexDirection="row"
        alignItems="center"
        width="100%"
        gap={1}
        sx={{
          color:
            color === "grey"
              ? theme.palette.grey[500]
              : theme.palette.text.primary,
          marginTop: size === 1 ? "-10px" : "0",
        }}
      >
        {children}
        {description && (
          <>
            {displaySeparator && (
              <Typography
                sx={{
                  fontSize: "54px",
                  fontWeight: 300,
                }}
                component="span"
              >
                {"}"}
              </Typography>
            )}
            <Typography
              sx={{ padding: displaySeparator ? "0" : "10px 0 10px 20px" }}
              variant="body2"
            >
              {description}
            </Typography>
          </>
        )}
      </Stack>
    </>
  );
};

export const Instruction = () => {
  const { steps } = useStep();
  return (
    <>
      <Explanation
        title="Projdi 5 až 8 kroky a prozkoumej fungování algoritmu:"
        description="Vstupní hodnoty, které je potřeba algoritmu zadat"
        displaySeparator
        children={<OrderedList steps={steps.slice(0, 4)} />}
      />

      <Explanation
        description="Výpočet elementů (lze přeskočit)"
        color="grey"
        displaySeparator
        children={<OrderedList steps={steps.slice(4, 7)} start={5} />}
      />

      <Explanation
        description="Algoritmem vygenerovaná struktura"
        size={1}
        displaySeparator
        children={<OrderedList steps={steps.slice(7, 8)} start={8} />}
      />

      <Explanation
        title="Symboly:"
        description="Do mřížek s modrou tečkou je možné klikat."
        children={
          <img
            src={"/system-sykora/icons/circle.svg"}
            width={20}
            height={20}
            alt={"circle icon"}
            style={{ marginLeft: "10px" }}
          />
        }
      />

      <Explanation
        description="U mřížek s tímto symbolem můžeš měnit zobrazení elementů (název/obraz). 
        "
        children={
          <MobileStepper
            variant="dots"
            steps={2}
            position="static"
            activeStep={1}
            nextButton={<></>}
            backButton={<></>}
          />
        }
      />
    </>
  );
};
