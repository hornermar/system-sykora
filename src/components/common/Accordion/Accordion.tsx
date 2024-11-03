import {
  AccordionDetails,
  AccordionSummary,
  Accordion as MuiAccordion,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

type AccordionProps = {
  summary: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
};

export const Accordion = ({
  summary,
  children,
  defaultExpanded,
}: AccordionProps) => {
  const theme = useTheme();

  return (
    <MuiAccordion
      defaultExpanded={defaultExpanded}
      sx={{
        "&.MuiPaper-root": {
          margin: "0",
          borderBottom: `1px solid ${theme.palette.secondary.main}`,
          borderRadius: "0",
          "&::before": {
            backgroundColor: "transparent", // Remove background color
          },
        },
      }}
    >
      <AccordionSummary
        expandIcon={
          <img
            src={"/system-sykora/icons/chevron-down.svg"}
            width={10}
            height={10}
            alt={"chevron down icon"}
          />
        }
      >
        {summary}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </MuiAccordion>
  );
};
