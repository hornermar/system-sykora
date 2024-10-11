import { Density } from "../../../../types/Density";
import { Grid } from "../../../Grid/Grid";
import { Dialog } from "../../../common/Dialog/Dialog";
import { map, filter } from "lodash";
import { elementList } from "../../../../lib/elementList";

type CalculationGroupDialogProps = {
  open: boolean;
  onClose: () => void;
  group: Density;
};

const smallSize = 35;

export const CalculationGroupDialog = ({
  open,
  onClose,
  group,
}: CalculationGroupDialogProps) => {
  const options = filter(
    elementList,
    ({ colorDensity }) => colorDensity === group.result
  );

  return (
    <Dialog title="Skupina 2" open={open} onClose={onClose}>
      <Grid
        grid={[map(options, (option) => option.name)]}
        displayName
        size={smallSize}
        sx={{
          justifyContent: "flex-start",
          gap: "10px",
          marginTop: "10px",
        }}
      />
    </Dialog>
  );
};
