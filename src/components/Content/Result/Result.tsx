import { Dispatch, SetStateAction } from "react";
import { Button, Box } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/system";

import { useSwitch } from "../../../hooks/useSwitch";
import { ResultEdit } from "./Edit";
import { ResultCollapse } from "./Collapse";
import { FormValues } from "../../../types/FormValues";

type ResultProps = {
  form: FormValues;
  onFormChange: (newFormValues: Partial<FormValues>) => void;

  setIsRandom: Dispatch<SetStateAction<boolean>>;
  isRandom: boolean;
  setDisplayDefaultGrid: Dispatch<SetStateAction<boolean>>;
  displayDefaultGrid: boolean;
};

export const Result = ({
  form,
  onFormChange,

  setIsRandom,
  isRandom,
  displayDefaultGrid,
  setDisplayDefaultGrid,
}: ResultProps) => {
  const [editOpen, onEditOpen, onEditClose] = useSwitch(false);

  const theme = useTheme();
  const isSmallMedia = useMediaQuery(theme.breakpoints.down("lg"));

  const renderResultEdit = () => (
    <ResultEdit
      form={form}
      onFormChange={onFormChange}
      isRandom={isRandom}
      setIsRandom={setIsRandom}
      displayDefaultGrid={displayDefaultGrid}
      setDisplayDefaultGrid={setDisplayDefaultGrid}
    />
  );

  return (
    <Box>
      {isSmallMedia && (
        <Button
          onClick={editOpen ? onEditClose : onEditOpen}
          variant="contained"
          color="primary"
          sx={{ position: "fixed", right: -20, bottom: 230, zIndex: 1000 }}
          startIcon={
            <img
              src={"/icons/pen.svg"}
              width={20}
              height={20}
              alt={"question icon"}
            />
          }
        ></Button>
      )}

      {isSmallMedia ? (
        <ResultCollapse open={editOpen} children={renderResultEdit()} />
      ) : (
        renderResultEdit()
      )}
    </Box>
  );
};
