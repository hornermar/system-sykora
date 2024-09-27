import {
    AccordionDetails,
    AccordionSummary,
    Accordion as MuiAccordion,
    styled,
} from "@mui/material";

const StyledAccordion = styled(MuiAccordion)((props) => ({
    "&.MuiPaper-root": {
        boxShadow: "none",
        borderRadius: "0",
        borderBottom: "1px solid #aab4be",
        margin: "0",
    },
    ".MuiButtonBase-root": {
        minHeight: "unset !important",
        margin: "0 !important",
        padding: "5px 0",
    },
    ".MuiAccordionSummary-content, .Mui-expanded": {
        margin: "0 !important",
    },
    ".MuiAccordionDetails-root": {
        padding: "15px 0 15px 0",
    },
}));

type AccordionProps = {
    summary: string;
    children: React.ReactNode;
};

export const Accordion = ({ summary, children }: AccordionProps) => {
    return (
        <StyledAccordion>
            <AccordionSummary expandIcon={<span>&#x2212;</span>}>
                {summary}
            </AccordionSummary>
            <AccordionDetails>{children}</AccordionDetails>
        </StyledAccordion>
    );
};
