import { Typography } from "@mui/material";
import { FormValues } from "../../../types/FormValues";
import { ResultEdit } from "./Edit";
import { Dispatch, SetStateAction } from "react";

import { useSwitch } from "../../../hooks/useSwitch";

import { ResultCollapse } from "./Collapse";
import { useMediaQuery, useTheme } from "@mui/system";

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
    <>
      {isSmallMedia && (
        <Typography
          variant="body1"
          onClick={editOpen ? onEditClose : onEditOpen}
          className="underline"
        >
          <b>{editOpen ? "Skrýt panel vstupů" : "Panel vstupů (úprava)"}</b>
        </Typography>
      )}

      {isSmallMedia ? (
        <ResultCollapse open={editOpen} children={renderResultEdit()} />
      ) : (
        renderResultEdit()
      )}
    </>
  );
};
