import {
  AccordionDetails,
  AccordionSummary,
  Accordion as MuiAccordion,
} from "@mui/material";

type AccordionProps = {
  summary: string;
  children: React.ReactNode;
};

export const Accordion = ({ summary, children }: AccordionProps) => {
  return (
    <MuiAccordion>
      <AccordionSummary expandIcon={<span>&#x2212;</span>}>
        {summary}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </MuiAccordion>
  );
};
