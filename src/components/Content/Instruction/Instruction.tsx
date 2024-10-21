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
        <Typography variant="subtitle2">{step.label}</Typography>
      </Box>
    ))}
  </Box>
);

type ExplanationProps = {
  children: React.ReactNode;
  itemsCount: number;
  description?: string;
  start?: number;
  color?: string;
};

const Explanation = ({
  itemsCount,
  description,
  color,
  children,
}: ExplanationProps) => {
  const theme = useTheme();
  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      width="100%"
      gap={0.5}
      sx={{
        color:
          color === "grey"
            ? theme.palette.grey[500]
            : theme.palette.text.primary,
        marginTop: itemsCount === 1 ? "-20px" : "0",
      }}
    >
      {children}
      {description && (
        <>
          <Typography
            sx={{
              fontSize: "60px",
              fontWeight: 300,
              // marginBottom: itemsCount === 1 ? "0" : "10px",
            }}
            component="span"
          >
            {/* {itemsCount === 1 ? "–⁠⁠⁠⁠⁠⁠" : "}"} */}
            {"}"}
          </Typography>
          <Typography variant="caption">{description}</Typography>
        </>
      )}
    </Stack>
  );
};

export const Instruction = () => {
  const { steps } = useStep();
  return (
    <>
      <Typography variant="body1">Projdeš 5 až 8 kroky:</Typography>
      <Explanation
        itemsCount={4}
        description="Vstupní hodnoty, které je potřeba do algoritmu zadat"
        children={<OrderedList steps={steps.slice(0, 4)} />}
      />

      <Explanation
        itemsCount={3}
        description="Vysvětlení výpočtu jednotlivých prvků. Tyto kroky je možné přeskočit."
        color="grey"
        children={<OrderedList steps={steps.slice(4, 7)} start={5} />}
      />

      <Explanation
        itemsCount={1}
        description="Vygenerovaná struktura, kterou je možné upravovat a sledovat změny."
        children={<OrderedList steps={steps.slice(7, 8)} start={8} />}
      />

      <Typography variant="body1">Interactivní mřížka</Typography>
      <Explanation
        itemsCount={1}
        description="U mřížek, které pod sebou mají tečky, je možné měnit zobrazení prvků. Na výběr je z názvů nebo obrazů a změníte jej přejetím po displeji."
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

      <Typography variant="body1">Přepínání zobrazení</Typography>
      <Explanation
        itemsCount={1}
        description="Do mřížek s tímto symbolem je možné klikat."
        children={
          <img
            src={"/icons/hand-pointer.svg"}
            width={20}
            height={20}
            alt={"circle icon"}
          />
        }
      />
    </>
  );
};
